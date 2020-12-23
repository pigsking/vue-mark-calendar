import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
// import jsx from "acorn-jsx";

export default {
    input: "./packages/index.js",
    output: [
        {
            file: "./dist/vue-mark-calendar.umd.js",
            format: "umd",
            name: 'Calendar'
        },
        {
            file: "./dist/vue-mark-calendar.es.js",
            format: "es" 
        }
    ],
    plugins: [
        vue({ css: false }),
        postcss({
            extract: false
        }),
        nodeResolve(),
        commonjs({
            include: 'node_modules/**'
        }),
        babel({ exclude: 'node_modules/**', babelHelpers: 'runtime' }),
        terser()
    ],
    // acornInjectPlugins: [jsx()],
    external: ["vue"],
}