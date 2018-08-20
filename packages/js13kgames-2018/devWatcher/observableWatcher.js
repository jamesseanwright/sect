'use strict';

const createObservableWatcher = watch => {
    const createOperationState = (name, parameters) => ({
        name,
        parameters,
    });

    return {
        subscribe(eventName) {
            const createInvoker = operators => path => {
                let value = path;

                for (let { name, parameters } of operators.chain) {
                    switch(name) {
                        case 'filter':
                            if (!parameters.predicate(value)) {
                                return;
                            }

                            break

                        case 'do':
                            parameters.callback(value);
                            break;

                        case 'map':
                            value = parameters.callback(value);
                            break;

                        case 'log':
                            console.log(parameters.callback(path));
                            break;

                        default:
                            throw new Error('Operator not found');
                    }
                }
            };

            const operators = {
                chain: [],

                filter(predicate) {
                    this.chain.push(
                        createOperationState('filter', { predicate })
                    );

                    return this;
                },

                map(callback) {
                    this.chain.push(
                        createOperationState('map', { callback })
                    );

                    return this;
                },

                do(callback) {
                    this.chain.push(
                        createOperationState('do', { callback })
                    );

                    return this;
                },

                log(callback) {
                    this.chain.push(
                        createOperationState('log', { callback })
                    );

                    return this;
                }
            };

            watch.on(eventName, createInvoker(operators));

            return operators;
        }
    };
};

module.exports = createObservableWatcher;
