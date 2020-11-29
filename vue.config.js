module.exports = {
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