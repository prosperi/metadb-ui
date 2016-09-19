import assign from 'object-assign'
import { search } from '../../lib/api'
import {
	RECEIVE_SEARCH_ERROR,
	RECEIVE_SEARCH_RESULTS,
	SEARCHING,
	UPDATING_SEARCH,
} from '../constants'

const REQUIRED_OPTS = {
	format: 'json', 
	search_field: 'search'
}

const DEFAULT_OPTS = {
	per_page: 25,
}

const conductSearch = (dispatch, query, facet, opts) => {
	return search(query, facet, opts)
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

// TODO: better name for this one?
//
// @arg query -> the actual search query
// @arg facets -> an object of facets (from store)
//							  in form of { 'facet': ['value', 'value2'] }
// @arg options -> other querystring values, like `page`, `per_page`, etc.
export const searchCatalog = (query, facets, opts) => dispatch => {
	// save ourselves the hassle of keeping track of these defaults
	const options = assign({}, DEFAULT_OPTS, opts, REQUIRED_OPTS)

	dispatch({
		type: SEARCHING,
		query,
		facets,
		options,
	})

	return conductSearch(dispatch, query, facets, options)
}

export const toggleFacet = (field, value, checked) => (dispatch, getState) => {
	const search = getState().search || {}
	const query = search.query
	const facets = assign({}, search.facets)
	const options = assign({}, DEFAULT_OPTS, search.options, REQUIRED_OPTS)

	if (checked) {
		if (facets[field] && facets[field].indexOf(value) > -1)
			return

		facets[field] = [].concat(facets[field], value).filter(Boolean)
	} else {
		const idx = facets[field].indexOf(value)

		if (idx === -1)
			return

		facets[field] = [].concat(
			facets[field].slice(0, idx),
			facets[field].slice(idx + 1)
		)
	}

	dispatch({
		type: UPDATING_SEARCH,
		query,
		facets,
		options,
	})

	return conductSearch(dispatch, query, facets, options)
}
