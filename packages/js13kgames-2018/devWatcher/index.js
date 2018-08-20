'use strict';

const path = require('path');
const chokidar = require('chokidar');
const child_process = require('child_process');
const createObservableWatcher = require('./observableWatcher');
const currentPackageMetadata = require(path.join(process.cwd(), 'package.json'));

const isRepoRoot = currentPackageMetadata.name === 'sect-monorepo';

if (!isRepoRoot) {
    throw new Error('Please run from the monorepo`s root!');
}

const isValidSourcePath = path =>
    !path.includes('node_modules')
    && !path.includes('js13kgames-2018')
    && !path.includes('dist');

console.log('Listening for monorepo source changes...');

createObservableWatcher(chokidar.watch('packages'))
    .subscribe('change')
    .filter(isValidSourcePath)
    .log(path => `Change detected for ${path}`)
    .map(path => /(packages.*)\/src\/.*/.exec(path)[1])
    .log(packageRoot => `Rebuilding ${packageRoot}`)
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
