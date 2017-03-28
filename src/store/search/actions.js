import { createAction } from 'redux-actions'
import blqs from 'blacklight-querystring'
import browserHistory from 'react-router/lib/browserHistory'
import findIndex from 'array-find-index'
import isEqual from 'lodash.isequal'

import * as api from './endpoints'
import * as utils from './utils'

const hasProperty = (obj, prop) => (
	Object.prototype.hasOwnProperty.call(obj, prop)
)

export const fetchingSearch = createAction('fetching search')
export const fetchingSearchErr = createAction('error fetching search')
export const receivedSearchResults = createAction('received search results')

const conductSearch = (dispatch, query, facets, options, queryString) => {
	dispatch(fetchingSearch({query, facets, options, queryString}))

	utils.searchHistory.add({query, facets, options})

	return api.search(queryString + '&format=json')
		.then(results => results.response)
		.then(results => {
			dispatch(receivedSearchResults({results}))
		})
		.catch(error => {
			dispatch(fetchingSearchErr(error))
		})
}

export const searchCatalog = (query, facets, opts) => {
	return dispatch => {
		if (!facets) facets = {}
		if (!opts) opts = {}

		const queryString = utils.formatSearchQueryString(query, facets, opts)

		browserHistory.push({
			pathname: '/search',
			search: `?${queryString}`,
			state: {
				query,
				facets,
				opts,
			}
		})

		return conductSearch(dispatch, query, facets, opts, queryString)
	}
}

// this function is used when arriving on a Search page w/ a pre-populated
// search querystring (ex. arriving from a link, refreshing the results)
// `parseSearchQuerystring` is used to extract the query, facets, and
// options + passed to `conductSearch`
export const searchCatalogByQueryString = queryString => {
	return dispatch => {
		const { query, facets, options } = blqs.parse(queryString)

		if (hasProperty(options, 'range')) {
			const { range } = options
			delete options.range

			for (let r in range) {
				if (!facets[r])
					facets[r] = []

				facets[r].push(utils.createRangeFacet(r, range[r].begin, range[r].end))
			}
		}

		return conductSearch(dispatch, query, facets, options, queryString)
	}
}

// toggle options such as `per_page` and `page`
// TODO: remove this for infinite scrolling
export const setSearchOption = (field, value) => {
	return (dispatch, getState) => {
		const search = getState().search || {}
		const { query, facets, options } = search

		if (value === null) {
			delete options[field]
		} else {
			options[field] = value
		}

		return searchCatalog(query, facets, options)(dispatch)
	}
}

export const toggleSearchFacet = (field, facet, isChecked) => {
	return (dispatch, getState) => {
		const search = getState().search || {}

		const query = search.query
		const facets = { ...search.facets }
		const options = { ...search.options }

		let dirty = false
		let idx = -1

		if (facets[field]) {
			idx = findIndex(facets[field], f => {
				if (hasProperty(f, 'value') && hasProperty(facet, 'value')) {
					return isEqual(f.value, facet.value)
				} else {
					return isEqual(f, facet)
				}
			})
		}

		if (isChecked) {
			if (idx === -1) {
				facets[field] = [].concat(facets[field], facet).filter(Boolean)
				dirty = true
			}
		}

		else {
			if (idx !== -1) {
				facets[field] = [].concat(
					facets[field].slice(0, idx),
					facets[field].slice(idx + 1)
				)

				dirty = true
			}
		}

		if (!dirty) {
			return Promise.resolve()
		}

		// reset the page count if it's set
		if (options.page) {
			delete options.page
		}

		return searchCatalog(query, facets, options)(dispatch)
	}
}
