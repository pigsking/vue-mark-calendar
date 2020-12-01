module.exports = {
    // publicPath: 'vue-mark-calendar',
    outputDir: 'docs',
    css: {
        extract: false,
        sourceMap: false,
    },
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    }
}