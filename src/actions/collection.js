import {
	COLLECTION_CHANGE,
	RECEIVE_ALL_COLLECTIONS,
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

// fetches all collections
// (stuffed w/ data for now; to be replaced w/ api call later)
export const fetchAllCollections = () => dispatch => {
	const collectionsMetadata =  [
		{name: 'First Collection', id: 'first-collection'},
		{name: 'Test Collection', id: 'test-collection'},
		{name: 'Beyond Steel', id: 'beyond-steel'},
	]

	dispatch({
		type: RECEIVE_ALL_COLLECTIONS,
		data: collectionsMetadata,
	})
}
