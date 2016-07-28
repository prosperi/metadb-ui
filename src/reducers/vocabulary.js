import {
	RECEIVE_VOCABULARY,
} from '../actions/constants'

import assign from 'object-assign'

export default vocabularyReducer (state, action) {
	switch (action.type) {
		case: RECEIVE_VOCABULARY:
			const merge = {}
			merge[action.name] = action.values

			return assign({}, state, merge)
		
		default:
			return state
	}
}
