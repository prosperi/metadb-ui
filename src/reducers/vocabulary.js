import {
	CLEAR_VOCABULARIES,
	RECEIVE_VOCABULARY,
} from '../actions/constants'

import assign from 'object-assign'

export default vocabularyReducer (state, action) {
	switch (action.type) {
		case CLEAR_VOCABULARIES:
			return {}

		case RECEIVE_VOCABULARY:
			const merge = {}
			merge[action.name] = action.values

			return assign({}, state, merge)
		
		default:
			return state
	}
}
