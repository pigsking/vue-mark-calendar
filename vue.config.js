module.exports = {
    publicPath: '/vue-mark-calendar/',
    outputDir: 'docs',
    css: {
        extract: false,
        sourceMap: false,
        modules: true
    },
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    }
}