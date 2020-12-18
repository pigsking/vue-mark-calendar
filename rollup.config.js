import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';


export default {
    input: "./packages/index.js",
    output: [
        {
            file: "./dist/vue-mark-calendar.umd.js",
            format: "umd",
            name: 'Calendar'
        }
    ],
    plugins: [
        vue({ css: false }),
        postcss({
            extract: false
        }),
        resolve(),
        commonjs({
            include: 'node_modules/**'
        }),
        babel({ exclude: 'node_modules/**', babelHelpers: 'runtime' }),
        terser()
    ],
}