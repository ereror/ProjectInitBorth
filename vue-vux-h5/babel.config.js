const babelConfig = {
    presets: [["@babel/preset-env",{
        useBuiltIns: "entry",
        corejs: 2
    }]],
  plugins: ['dynamic-import-webpack', '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
}

module.exports = babelConfig