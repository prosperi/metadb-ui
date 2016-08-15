import xhr from 'xhr'
import assign from 'object-assign'

const API_BASE_URL = process.env.API_BASE_URL

function apiRequest (method, path, data, options, callback) {
	if (typeof data === 'function') {
		return apiRequest(method, path, null, null, data)
	}

	if (typeof options === 'function') {
		return apiRequest(method, path, data, null, options)
	}

	const uri = buildUrl(path)

	const xhrOpts = assign({}, {
		json: data || true,
		method: method,
		uri,
	}, options)

	xhr(xhrOpts, function (xhrErr, response, body) {
		if (xhrErr) return callback(xhrErr)

		let err

		if (response.statusCode === 500) {
			err = new Error('Internal server error')
			err.statusCode = response.statusCode
			return callback(err)
		}

		return callback(null, body)
	})
}

function buildUrl (path) {
	const p = path[0] === '/' ? path : `/${path}`

	return API_BASE_URL + p
}

export function get () {
	return apiRequest.bind(null, 'GET').apply(null, arguments)
}

export function post () {
	return apiRequest.bind(null, 'POST').apply(null, arguments)
}

export function put () {
	return apiRequest.bind(null, 'PUT').apply(null, arguments)
}
