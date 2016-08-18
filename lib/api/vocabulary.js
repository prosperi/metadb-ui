// vocabulary api things
import { get } from './request'
import { VOCABULARY_PATH } from './constants'

export function getVocabulary (path, callback) {
	return get(path, callback)
}

export function getVocabularies (callback) {
	return get(`/${VOCABULARY_PATH}.json`, callback)
}
