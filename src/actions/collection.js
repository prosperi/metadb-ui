import {
	COLLECTION_CHANGE,
	SAVE_COLLECTION_CHANGES,
} from './constants'

export const editCollectionField = (key, value) => dispatch => (
	dispatch({
		type: COLLECTION_CHANGE,
		key,
		value,
	})
)

export const mergeCollectionUpdates = () => dispatch => (
	dispatch({
		type: SAVE_COLLECTION_CHANGES,
	})
)
