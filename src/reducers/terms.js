import assign from 'object-assign'

import {
	FETCH_TERMS,
	RECEIVE_TERMS,
} from '../actions/constants'

export default function termsReducer (state, action) {
	if (typeof state === 'undefined')
		return {}

	switch (action.type) {

		case FETCH_TERMS:
			return fetchTerms(state, action)

		case RECEIVE_TERMS:
			return receiveTerms(state, action)

		default:
			return state
	}
}

function fetchTerms (state, action) {
	const update = {}
	update[action.uri] = {
		isFetching: true,
	}

	return assign({}, state, update)
}

function receiveTerms (state, action) {
	const terms = action.data
	const uri = action.uri

	const update = {}
	update[uri] = {
		fetchedAt: Date.now(),
		isFetching: false,
		data: action.data,
	}
	
	return assign({}, state, update)
}
