import assign from 'object-assign'
import findIndex from 'array-find-index'

import { search } from '../../lib/api'
import { addSearch as addSearchToHistory } from '../../lib/search-history'
import browserHistory from 'react-router/lib/browserHistory'
import formatSearchQuerystring from '../../lib/format-search-querystring'
import parseSearchQuerystring from '../../lib/parse-search-querystring'

import {
	RECEIVE_SEARCH_ERROR,
	RECEIVE_SEARCH_RESULTS,
	SEARCHING,
} from '../constants'

const REQUIRED_OPTS = {
	utf8: '✓',
	search_field: 'search',
}

const DEFAULT_OPTS = {
	per_page: 25,
}

function conductSearch (dispatch, query, facets, options, queryString) {
	dispatch({
		type: SEARCHING,
		query,
		facets,
		options,
		queryString,
	})

	addSearchToHistory({query, facets, options})

	return search(queryString + '&format=json')
	.then(results => {
		dispatch({
			type: RECEIVE_SEARCH_RESULTS,
			results,
		})

		return results
	})
	.catch(error => {
		dispatch({
			type: RECEIVE_SEARCH_ERROR,
			error,
		})

		throw error
	})
}

export const searchCatalog = (query, facets, opts) => dispatch => {
	// save ourselves the hassle of keeping track of these defaults
	const options = assign({}, REQUIRED_OPTS, opts)

	if (!facets)
		facets = {}

	const queryString = formatSearchQuerystring(query, facets, options)
	browserHistory.push('/search?' + queryString)

	return conductSearch(dispatch, query, facets, options, queryString)
}

export const searchCatalogByQueryString = queryString => dispatch => {
	const parsed = parseSearchQuerystring(queryString.replace(/^\?/, ''))

	return conductSearch(dispatch, parsed.query, parsed.facets, parsed.opts, queryString)
}

export const setSearchOption = (field, value) => (dispatch, getState) => {
	const search = getState().search || {}

	const query = search.query || ''
	const facets = assign({}, search.facets)
	const options = assign({}, DEFAULT_OPTS, REQUIRED_OPTS, search.options)

	// save us another call
	if (options[field] && options[field] === value)
		return Promise.resolve()

	// we'll pass null to remove the option
	if (value === null) {
		delete options[field]
	}

	options[field] = value

	// since searchCatalog's a thunk, we'll use the passed `dispatch` + call it again
	return searchCatalog(query, facets, options)(dispatch)
}

// while developing we had to worry about juggling facets vs. selected facets
// (when adding a facet to selected we'd have to remove it from the original
// pool to prevent duplication). when talking to the api, this will be handled
// for us, making the job of this function to add/remove values from a 
// `selectedFacets` array before resubmitting the search.
export const toggleSearchFacet = (field, facet, checked) => (dispatch, getState) => {
	const search = getState().search || {}
	
	// recycling the previous search info
	const query = search.query || ''
	const options = assign({}, DEFAULT_OPTS, REQUIRED_OPTS, search.options)
	
	const facets = assign({}, search.facets)
	let dirty = false
	let idx
	
	if (facets[field])
		idx = findIndex(facets[field], f => f.value === facet.value)
	else
		idx = -1


	// add to selected-facets
	if (checked) {
		if (idx === -1) {
			facets[field] = [].concat(facets[field], facet).filter(Boolean)
			dirty = true
		}
	}

	// remove from selected-facets
	else {
		if (idx !== -1) {
			facets[field] = [].concat(
				facets[field].slice(0, idx),
				facets[field].slice(idx + 1)
			)
			
			if (!facets[field].length) 
				delete facets[field]

			dirty = true
		}
	}

	if (!dirty)
		return Promise.resolve()

	// reset the page count (if it's already set)
	if (options.page)
		delete options.page

	return searchCatalog(query, facets, options)(dispatch)
}
