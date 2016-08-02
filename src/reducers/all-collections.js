import {
	RECEIVE_ALL_COLLECTIONS,
} from '../actions/constants'

export default function allCollectionsReducer (state, action) {
	if (typeof state === 'undefined') 
		state = []

	switch (action.type) {
		case RECEIVE_ALL_COLLECTIONS:
			return action.data

		default:
			return state
	}
}
