import assign from 'object-assign'
import { search } from '../../lib/api'
import {
	RECEIVE_SEARCH_ERROR,
	RECEIVE_SEARCH_RESULTS,
	SEARCHING,
} from '../constants'

// TODO: better name for this one?
//
// @arg query -> the actual search query
// @arg facets -> an object of facets (from store)
//							  in form of { 'facet': ['value', 'value2'] }
// @arg options -> other querystring values, like `page`, `per_page`, etc.
export const searchCatalog = (query, facets, options) => dispatch => {
	// save ourselves the hassle of keeping track of these defaults
	const opts = assign({}, options, {
		format: 'json',
		search_field: 'search',
	})

	dispatch({
		type: SEARCHING,
		query,
		facets,
		options,
	})

	return search(query, facets, opts)
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
