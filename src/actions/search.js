import assign from 'object-assign'
import findIndex from 'array-find-index'
import { search } from '../../lib/api'
import formatSearchQuerystring from '../../lib/format-search-querystring'
import {
	RECEIVE_SEARCH_ERROR,
	RECEIVE_SEARCH_RESULTS,
	SEARCHING,
} from '../constants'

const REQUIRED_OPTS = {
	search_field: 'search'
}

const DEFAULT_OPTS = {
	per_page: 25,
}

export const searchCatalog = (query, facets, opts) => dispatch => {
	// save ourselves the hassle of keeping track of these defaults
	const options = assign({}, opts, REQUIRED_OPTS)

	if (!facets)
		facets = {}

	const queryString = formatSearchQuerystring(query, facets, options)

	dispatch({
		type: SEARCHING,
		query,
		facets,
		options,
		queryString
	})

	return search(queryString)
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

export const setSearchOption = (field, value) => (dispatch, getState) => {
	const search = getState().search || {}

	const query = search.query || ''
	const facets = assign({}, search.facets)
	const options = assign({}, DEFAULT_OPTS, search.options, REQUIRED_OPTS)

	// save us another call
	if (options[field] && options[field] === value)
		return Promise.resolve()

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
	const options = assign({}, DEFAULT_OPTS, search.options, REQUIRED_OPTS)
	
	const facets = assign({}, search.facets)
	const idx = findIndex(facets[field], f => f.value === facet.value)

	let dirty = false

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
			dirty = true
		}
	}

	if (!dirty)
		return Promise.resolve()

	return searchCatalog(query, facets, options)(dispatch)
}
