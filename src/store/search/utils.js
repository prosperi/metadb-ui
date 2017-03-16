/* globals localStorage */
import blqs from 'blacklight-querystring'

export const createRangeFacet = (name, min, max) => {
	const label = min === max ? `${min}` : `${min} - ${max}`

	return {
		label,
		name,
		value: {
			begin: min,
			end: max,
		},
		type: 'range'
	}
}

export const formatSearchQueryString = (query, facets, options) => {
	if (!facets)
		facets = {}

	// instead of passing the query, facets, and options directly
	// to `blacklight-querystring`, we'll need to do a little cleanup:
	//
	// 1) blqs#stringify expects a flat array of facet values per group,
	//    whereas we're storing the full objects in state (which contain
	//    the value, name, and label). so we'll extract the value.
	// 2) the `range` facet is handled completely differently from
	//    other facets, so we'll look for values w/ a `type` attribute,
	//    assume a shallow value + assign it to an object (whose key
	//    matches the `type` attribute) within the `options` object.

	const mappedFacets = {}
	const opts = { ...options }

	Object.keys(facets).forEach(key => {
		const facet = facets[key]

		for (let i = 0; i < facet.length; i++) {
			const current = facet[i]
			const type = current.type

			if (typeof type !== 'undefined') {
				if (!opts[type]) {
					opts[type] = {}
				}

				opts[type][key] = current.value
			} else {
				if (!mappedFacets[key]) {
					mappedFacets[key] = []
				}

				mappedFacets[key].push(current.value)
			}
		}
	})

	const toStringify = {
		options: opts,
		facets: mappedFacets,
		query,
	}

	const strung = blqs.stringify(toStringify)
	return strung
}

// TODO: move STORED_KEY + STORED_LIMIT to a user setting
export const searchHistory = {
	STORED_KEY: 'search-history',
	STORED_LIMIT: 20,

	add: function addEntryToSearchHistory (search, limit) {
		limit = limit || this.STORED_SEARCH_LIMIT

		const history = this.getAll()
		const update = [].concat(search, history.slice(0, limit - 1))

		localStorage.setItem(this.STORED_SEARCH_KEY, JSON.stringify(update))
	},

	clear: function clearSearchHistory () {
		localStorage.setItem(this.STORED_SEARCH_KEY, '[]')
	},

	getAll: function getAllSearchHistory () {
		const history = localStorage.getItem(this.STORED_SEARCH_KEY) || '[]'

		try {
			return JSON.parse(history)
		} catch(e) {
			return []
		}
	},

	getPreviousQueries: function getPreviousSearchQueries () {
		const history = localStorage.getItem(this.STORED_SEARCH_KEY) || '[]'

		try {
			const parsed = JSON.parse(history)
			return parsed
				.map(search => search.query)
				.filter((query, idx, arr) => query && (arr.indexOf(query) === idx))
		} catch (e) {
			return []
		}
	},
}
