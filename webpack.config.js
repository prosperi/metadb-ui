var webpack = require('webpack')
var path = require('path')

module.exports = {
	// entry: [
	// 	'./src/index.js',
	// 	'webpack/hot/dev-server',
	// 	'webpack-dev-server/client?http://localhost:8081',
	// ],

	entry: './src/index.js',

	output: {
		// publicPath: 'http://loclahost:8081/assets/',
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				},
				include: __dirname
			},
			{
				test: /\.json$/,
				exclude: /node_modules/,
				loader: 'json-loader',
			},
			{
				test: /\.css$/,
				loaders: ['style', 'raw'],
				include: __dirname
			}
		]
	},
}
