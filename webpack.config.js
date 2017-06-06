// webpack配置
module.exports = {
	entry: {
		'image-process-tools': './src/image-process-tools.js'
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].js',
		// 浏览器环境在window下注册capcd
		library: 'IPTS',
		// 同时支持AMD/CMD
		libraryTarget: 'umd'
	}
//	resolve: {
//		extensions: ['js'],
//		modules: [
//			resolve('src'),
//			resolve('node_modules')
//		],
//		alias: {
//			'src': resolve('src')
//		}
//	},
//	module: {
//		rules: [
//			{
//				test: /\.js$/,
//				loader: 'babel-loader',
//				include: [resolve('src'), resolve('test')]
//			}
//		]
//	}
}
