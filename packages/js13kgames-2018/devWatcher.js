'use strict';

const path = require('path');
const chokidar = require('chokidar');
const rollup = require('rollup');

/* This allows us to determine if being run
 * at monorepo root or within this package */
const currentPackageMetadata = require(path.join(process.cwd(), 'package.json'));
const isRepoRoot = currentPackageMetadata.name === 'sect-monorepo';
const watchPath = isRepoRoot ? 'packages' : '..';

const createObservableWatcher = watch => {
    const createOperationState = (name, parameters) => ({
        name,
        parameters,
    });

    return {
        subscribe(eventName) {
            const createInvoker = operators => path => {
                for (let { name, parameters } of operators.chain) {
                    switch(name) {
                        case 'filter':
                            if (!parameters.predicate(path)) {
                                return;
                            }

                            break

                        case 'do':
                            parameters.callback(path);
                            break;
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

                do(callback) {
                    this.chain.push(
                        createOperationState('do', { callback })
                    );

                    return this;
                },
            };

            watch.on(eventName, createInvoker(operators));

            return operators;
        }
    };
};

createObservableWatcher(chokidar.watch(watchPath))
    .subscribe('change')
    .filter(path => !path.includes('node_modules'))
    .do(path => console.log(path))
