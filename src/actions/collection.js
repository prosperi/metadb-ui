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

export const saveCollection = () => dispatch => (
	// TODO: make API call to actually store these changes

	dispatch({
		type: SAVE_COLLECTION_CHANGES,
	})
)
