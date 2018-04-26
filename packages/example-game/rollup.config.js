import minify from 'rollup-plugin-babel-minify';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.min.js',
        format: 'iife',
    },
    plugins: [
        typescript(),
        resolve(),
        minify(),
    ],
};
