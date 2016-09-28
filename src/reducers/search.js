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

// this would be very straight-forward _if_ we weren't allowing
// users to return by way of copy/pasting a url w/ a search
// querystring. we're storing facets in state as objects,
// as opposed to the querystring where they are just the
// values. so in order to get these _back_ to objects, as the
// components are expecting them, we need to find their
// respective objects in the pool of facets returned from
// the server. 
function receiveResults (state, action) {
	// if we previously don't have a `facets` to check against,
	// use an empty object to prevent from throwing
	const keys = Object.keys(state.facets || {})

	// bail early if no facet keys
	if (!keys.length) {
		return assign({}, state, {
			isSearching: false,
		})
	}

	const selected = state.facets
	const fullSet = action.results.response.facets
	const facets = {}

	keys.forEach(key => {
		const facet = selected[key]
		facets[key] = facet.map(facet => {
			// in most cases (read: not arriving from a link) the facets
			// will be objects, so we'll just return them and deal with
			// the minimal extra work
			if (typeof facet === 'object' && facet !== 'null')
				return facet

			// otherwise, loop through all of the facet-groups to find
			// the appropriate one, and then loop through its items
			// to locate the facet object
			const group = findFacetGroup(fullSet, key)
			return findFacet(group, facet)

			// filter out any empty values that may have been returned
			// as `null`
		}).filter(Boolean)
	})

	return assign({}, state, {
		facets, isSearching: false
	})
}

function findFacetGroup (arr, val) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].name === val)
			return arr[i]
	}

	return null
}

function findFacet (group, val) {
	if (!group)
		return null

	for (let i = 0; i < group.items.length; i++)
		if (group.items[i].value === val)
			return group.items[i]

	return null
}
