const path = require('path')

// webpack配置
module.exports = {
  entry: {
    'image-process-tools': './src/image-process-tools.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    // 浏览器环境在window下注册capcd
    library: 'IPTS',
    // 同时支持AMD/CMD
    libraryTarget: 'umd'
  }
}
