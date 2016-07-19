// maybe a solution to work w/ react-router better?
// via http://stackoverflow.com/a/26218192

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.js')

const express = require('express')
const proxy = require('proxy-middleware')
const url = require('url')

// proxy
const app = express()
app.use('/assets', proxy(url.parse('http://localhost:8081/assets')))
app.get('/*', function (req, res) {
	res.sendFile(__dirname, + '/build/index.html')
})

// webpack-dev-server
const server = new WebpackDevServer(webpack(config), {
	contentBase: __dirname,
	hot: true,
	quiet: false,
	noInfo: false,
	publicPath: '/assets/',
	stats: { colors: true },
	filename: 'build/assets/bundle.js',
})

server.listen(8081, 'localhost', function () {})
app.listen(8080, function () { '@ http://localhost:8080' })
