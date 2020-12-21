module.exports = {
  presets: [
    [
      "@vue/babel-plugin-jsx",
      { useBuiltIns: "entry" }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      { useESModules: true }
    ]
  ]
}
