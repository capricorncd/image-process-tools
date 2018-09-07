/**
 * Created by Capricorncd 2018/09/06
 * https://github.com/zx1984
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 开发环境
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {
    'image-process-tools': './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        // include: path.resolve(__dirname, 'src'),
        query: {
          presets: ['env', 'stage-2']
        }
      },
      {
        test: /\.styl/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: function () {
                return [
                  require('autoprefixer')()
                ]
              }
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              compress: !isDev
            }
          }
        ]
      },
      {
        test: /\.(png|pneg|gif|jpg|jpeg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: false
    })
  ]
}
