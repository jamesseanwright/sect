import { readdirSync, readFileSync, statSync } from 'fs';
import { resolve as resolvePath } from 'path';
import resolve from 'rollup-plugin-node-resolve';
import mainConfig from './rollup.config';

// TODO: use externals to map to monorepo source files

const [, ...plugins] = mainConfig.plugins;

const isDirectory = name => statSync(resolvePath(__dirname, '..', name)).isDirectory();

const packages = readdirSync(resolvePath(__dirname, '..'))
    .filter(file => isDirectory(file) && file !== 'js13kgames-2018');

const isSectPackage = path =>
    packages.some(p => p.includes(path)) && path.includes('package.json');

export default {
    ...mainConfig,

    acorn: {
        allowReserved: true,
    },

    plugins: [
        resolve({
            extensions: ['.ts', '.mjs', '.js', '.jsx', '.json'],
        }),
        ...plugins,
    ],

    watch: {
        include: resolvePath(__dirname, '..'),
        clearScreen: false,
    },
};
