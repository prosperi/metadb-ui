import {
	COLLECTION_CHANGE,
	RECEIVE_COLLECTION,
	RECEIVE_ALL_COLLECTIONS,
	SAVE_COLLECTION_CHANGES,
} from './constants'

import {collections} from '../../data'

export const editCollectionField = (key, value) => dispatch => {
	return dispatch({
		type: COLLECTION_CHANGE,
		key,
		value,
	})
}

export const fetchCollection = id => dispatch => {
	const collection = collections[id]

	if (!collection) {
		return dispatch({
			type: FETCH_ERROR,
			data: {
				message: `Collection ${id} does not exist`
			}
		})
	}

	return dispatch({
		type: RECEIVE_COLLECTION,
		data: collection,
	})
}

// fetches all collections
// (stuffed w/ data for now; to be replaced w/ api call later)
export const fetchAllCollections = () => dispatch => {
	return dispatch({
		type: RECEIVE_ALL_COLLECTIONS,
		data: collections,
	})
}

export const saveCollection = () => dispatch => {
	// TODO: make API call to actually store these changes

	return dispatch({
		type: SAVE_COLLECTION_CHANGES,
	})
}
