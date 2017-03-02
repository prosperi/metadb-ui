// spin up a simple static server to run nightwatch against
// (expects `build/bundle.js` to exist, so run `npm run build`
// first!)

const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

const BASE_PATH = path.resolve(__dirname, '../build')

const server = http.createServer(function (req, res) {
	const url = req.url === '/' ? '/index.html' : req.url
	const file = path.join(BASE_PATH, url)

	fs.access(file, function (err) {
		// redirect anything that isn't a file through our app
		if (err) {
			fs.createReadStream(path.join(BASE_PATH, '/index.html')).pipe(res)
			return
		}

		const mimeType = mime.lookup(url)

		res.statusCode = 200
		res.setHeader('Content-Type', mimeType)
		fs.createReadStream(file).pipe(res)
	})
})

server.listen(8080)
