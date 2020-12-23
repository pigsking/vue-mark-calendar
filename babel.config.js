module.exports = {
  plugins: [
    "@vue/babel-plugin-jsx",
    [
      '@babel/plugin-transform-runtime',
      { useESModules: true }
    ]
  ]
}
