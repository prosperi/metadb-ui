// vocabulary api things
import { del, get, post } from './request'
import { VOCABULARY_PATH } from './constants'

export function createVocabulary (data, callback) {
	const payload = {
		'vocabulary': data
	}

	const url = `/${VOCABULARY_PATH}.json`

	return post(url, payload, (err, result) => {
		if (err)
			return callback(err)

		return callback(null, result)
	})
}

export function deleteVocabulary (data, callback) {
	const url = data.absolute_path
	return del(url, (err, result) => {
		if (err)
			return callback(err)

		return callback(null, result)
	})
}

export function getVocabulary (path, callback) {
	return get(path, callback)
}

export function getVocabularies (callback) {
	return get(`/${VOCABULARY_PATH}.json`, callback)
}
