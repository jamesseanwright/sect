'use strict';

const createObservableWatcher = watch => {
    const createOperationState = (name, parameters) => ({
        name,
        parameters,
    });

    return {
        subscribe(eventName) {
            const createInvoker = operators => path => {
                let initialValue = path;

                /* Required for async operators. Mixing async and promises
                 * is strange but required as reduce doesn't honour async */
                operators.chain.reduce((promise, { name, parameters }) => {
                    return promise.then(async ({ value, abort }) => {
                        if (abort) {
                            return {
                                value,
                                abort,
                            };
                        }

                        switch(name) {
                            case 'filter':
                                if (!parameters.predicate(value)) {
                                    return {
                                        value,
                                        abort: true
                                    };
                                }

                                return { value };

                            case 'do':
                                parameters.callback(value);
                                return { value };

                            case 'map':
                                const mappedValue = parameters.callback(value);
                                return { value: mappedValue };

                            case 'log':
                                console.log(parameters.callback(value));
                                return { value };

                            case 'await':
                                await parameters.asyncFunc();
                                return { value };

                            default:
                                throw new Error('Operator not found');
                        }
                    });
                }, Promise.resolve({ value: initialValue }));
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
                },

                await(asyncFunc) {
                    this.chain.push(
                        createOperationState('await', { asyncFunc })
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
