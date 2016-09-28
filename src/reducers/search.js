/**
 *  the search-state stores data related to the query itself -- results (which
 *  include: facets, docs, page info) are handled within the results component
 *  itself, as: a) that data doesn't need to be stored in the global state, and
 *  b) it can easily be re-fetched using search info here.
 *
 *  note: all of the heavy lifting is being done within the action/search creator
 *
 *  {
 *    // flagged when SEARCHING action is received
 *    isSearching: bool
 *
 *    // contains the actual search query
 *    query: string
 *
 *    // facets grouped by field
 *    // { 'subject': [{value: 'art' ...}, {value: 'anthropology' ...} ]}
 *    facets: object
 *
 *    // search options
 *    // { 'per_page': 25 }
 *    options: object
 *
 *		// the actual formatted querystring (used for pushState)
 *    queryString: string
 *  }
 */

import assign from 'object-assign'
import {
	RECEIVE_SEARCH_ERROR,
	RECEIVE_SEARCH_RESULTS,
	SEARCHING,
} from '../constants'

export default function searchReducer (state, action) {
	if (typeof state === 'undefined')
		return {}

	switch (action.type) {
		case SEARCHING:
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
		queryString: action.queryString,
	}
}

function receiveResults (state, action) {
	return assign({}, state, {
		isSearching: false,
	})
}
