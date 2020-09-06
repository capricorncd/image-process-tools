/**
 * Created by Capricorncd 2018/09/06
 * https://github.com/capricorncd
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 开发环境
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js',
    // library: 'ZxImageProcess',
    libraryTarget: 'umd',
    // libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        // include: path.resolve(__dirname, 'src'),
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          extensions: ['js', 'vue', 'jsx'],
          fix: true
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
        test: /\.(png|pneg|gif|jpg|jpeg|svg)$/,
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
