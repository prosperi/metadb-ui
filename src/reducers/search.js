import assign from 'object-assign'
import {
	RECEIVE_SEARCH_ERROR,
	RECEIVE_SEARCH_RESULTS,
	SEARCHING,
	UPDATING_SEARCH,
} from '../constants'

export default function searchReducer (state, action) {
	if (typeof state === 'undefined')
		return {}

	switch (action.type) {
		case SEARCHING:
		case UPDATING_SEARCH:
			return searching(state, action)

		case RECEIVE_SEARCH_ERROR:
		case RECEIVE_SEARCH_RESULTS:
			return receiveResults(state, action)

		default:
			return state
	}
}

function searching (state, action) {
	return {
		isSearching: true,
		query: action.query,
		facets: action.facets,
		options: action.options,
		results: [],
	}
}

function receiveResults (state, action) {
	return assign({}, state, {
		isSearching: false,
		results: (action.error ? [] : action.results),
	})
}
