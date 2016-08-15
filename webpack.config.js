var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var Bourbon = require('node-bourbon')
var Neat = require('node-neat')

module.exports = {
	// entry: [
	// 	'./src/index.js',
	// 	'webpack/hot/dev-server',
	// 	'webpack-dev-server/client?http://localhost:8081',
	// ],

	entry: [
		'./src/index.js',
		'./src/scss/main.scss',
	],

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
				include: __dirname,
			},
			{
				test: /\.json$/,
				exclude: /node_modules/,
				loader: 'json-loader',
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('style.css', {
			allChunks: true,
		}),
		new webpack.EnvironmentPlugin(['API_BASE_URL']),
	],
	sassLoader: {
		includePaths: Bourbon.with(Neat.includePaths)
	}
}
