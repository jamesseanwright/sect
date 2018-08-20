'use strict';

const path = require('path');
const chokidar = require('chokidar');
const child_process = require('child_process');
const rollup = require('rollup');

/* This allows us to determine if being run
 * at monorepo root or within this package */
const currentPackageMetadata = require(path.join(process.cwd(), 'package.json'));
const isRepoRoot = currentPackageMetadata.name === 'sect-monorepo';

if (!isRepoRoot) {
    throw new Error('Please run from the monorepo`s root!');
}

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

console.log('')

createObservableWatcher(chokidar.watch('packages'))
    .subscribe('change')
    .filter(path => !path.includes('node_modules') && !path.includes('js13kgames-2018'))
    .log(path => `Change detected for ${path}`)
    .map(path => /(\.\.\/.*)\/src/.exec(path)[1])
    .log(path => `Rebuilding ${path}`)
    .do(packageRoot => {
        child_process.execSync('npm run build', {
            cwd: packageRoot,
            stdio: [
                null,
                process.stdout,
                process.stderr,
            ],
        });
    })
    .log(path => `Built! ${path}. Rebuilding game...`)
    .do(() => {
        child_process.execSync('npm run build', {
            cwd: __dirname,
            stdio: [
                null,
                process.stdout,
                process.stderr,
            ],
        });
    })
    .log(path => `Game built!`);
