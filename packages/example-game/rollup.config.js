import minify from 'rollup-plugin-babel-minify';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const safeMinificationPlugins = [
    typescript(),
    minify(),
];

const extremeMinificationPlugins = [
    typescript(), // TODO: ES5 => closure compiler here
];

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.min.js',
        format: 'iife',
    },
    plugins: [
        resolve(),
        ...safeMinificationPlugins,
    ],
};
