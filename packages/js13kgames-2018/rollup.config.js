import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';
import { minify as esMinify } from 'uglify-es';
import reservedDomProps from 'uglify-es/tools/domprops';

const isDevMode = process.env.NODE_ENV = 'dev';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.min.js',
        format: 'iife',
    },
    plugins: [
        resolve(),
        typescript({
            check: !isDevMode,
        }),
        !isDevMode && uglify({
            mangle: {
                toplevel: true,
                properties: {
                    reserved: reservedDomProps,
                },
            }
        }, esMinify),
    ]
};
