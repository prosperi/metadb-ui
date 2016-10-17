const path = require('path')
const Bourbon = require('node-bourbon')
const Neat = require('node-neat')

module.exports = {
	module: {
		loaders: [
			{
				test: /\.s?css$/,
				loaders: ['style', 'css','sass'],
				include: path.resolve(__dirname, '../'),
			},
			{
				test: /\.json$/,
				exclude: /node_modules/,
				loader: 'json-loader',
				include: path.resolve(__dirname, '../'),
			}
		]
	},

	sassLoader: {
		includePaths: Bourbon.with(Neat.includePaths)
	}
}
