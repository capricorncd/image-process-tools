/**
 * Create by capricorncd
 * 2018/8/29 0022.
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBase = require('./_base')

module.exports = merge(webpackBase, {
  mode: 'development',
  entry: {
    'image-process-tools': './src/index.js'
  },
  // https://webpack.js.org/configuration/devtool/#development
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../../dist'),
    publicPath: '/',
    host: '0.0.0.0',
    port: 9005,
    overlay: {
      errors: true
    },
    hot: true
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: '"development"'
    //   }
    // }),
    new webpack.HotModuleReplacementPlugin()
    // new webpack.NoEmitOnErrorsPlugin()
  ]
})

