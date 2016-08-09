// vocabulary api things
import { get } from './request'
import { API_BASE_URL } from './constants'

export function getVocabulary (path, callback) {
	return get(path, callback)
}
