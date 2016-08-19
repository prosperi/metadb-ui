import { 
	get, patch,
} from './request'

import {
	JSON_EXTENSION,
	WORK_PATH,
} from './constants'

function buildWorkPath (id) {
	return `/${WORK_PATH}/${id}${JSON_EXTENSION}`
}

export function getWork (id, callback) {
	const path = buildWorkPath(id)
	return get(path, callback)
}

export function updateWork (id, updates, callback) {
	const path = buildWorkPath(id)
	const update = {generic_work: updates}

	return patch(path, update, callback)
}
