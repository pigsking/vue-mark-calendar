const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    publicPath: '/vue-mark-calendar/',
    outputDir: 'docs',
    productionSourceMap: false,
    css: {
        extract: false,
        requireModuleExtension: true
    },
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer = [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log']
                        }
                    }
                })
            ]
        }
    }
}