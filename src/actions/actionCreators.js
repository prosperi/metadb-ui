import {
	ADD_EMPTY_VALUE,
	REMOVE_VALUE,
	FETCH_COLLECTION,
	FETCH_WORK,
	FETCH_SCHEMA,
	RECEIVE_COLLECTION,
	RECEIVE_SCHEMA,
	RECEIVE_WORK,
} from './constants'

// add another field to a multi-value key so that:
// 		authors
//		  • Some Person
//
// becomes
//
//		authors
//			• Some Perons
//			*
export function addEmptyValue (workId, key) {
	return {
		type: ADD_EMPTY_VALUE,
		id: workId,
		key: key,
	}
}

// removes a field from a multi-value key
export function removeValue (workId, key, index) {
	return {
		type: REMOVE_VALUE,
		id: workId,
		key: key,
		index: index,
	}
}
