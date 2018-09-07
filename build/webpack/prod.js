/**
 * Create by zx1984
 * 2018/08/29 0022.
 * https://github.com/zx1984
 */
const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackBase = require('./_base')
const banner = require('../banner')

module.exports = merge(webpackBase, {
  mode: 'production',
  output: {
    filename: '[name].min.js'
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: '"production"'
    //   }
    // }),
    new webpack.BannerPlugin(banner)
  ]
})
