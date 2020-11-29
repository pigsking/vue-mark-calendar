module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? 'vue-mark-calendar' : '/',
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