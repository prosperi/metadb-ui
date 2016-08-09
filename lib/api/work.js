import { get } from './request'
import {
	JSON_EXTENSION,
	WORK_PATH,
} from './constants'

export function getWork (id, callback) {
	const path = `/${WORK_PATH}/${id}${JSON_EXTENSION}`
	return get(path, callback)
}
