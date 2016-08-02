import {
	CLEAR_SEARCH,
	IS_SEARCHING,
	RECEIVE_SEARCH_RESULTS,
} from '../actions/constants'

import assign from 'object-assign'

export default function searchReducer (state, action) {
	if (typeof state === 'undefined')
		return {}

	switch (action.type) {
		case CLEAR_SEARCH:
			return {}

		case IS_SEARCHING:
			return assign({}, state, {
				isFetching: true,

				// leave results empty so we can check on
				// whether or not this field exists
				// (`results: []` will by truthy)
				results: null,
			})

		case RECEIVE_SEARCH_RESULTS:
			return assign({}, state, {
				isFetching: false,
				results: action.data,
				query: action.query,
				queryString: action.queryString,
			})

		default:
			return state
	}
}
