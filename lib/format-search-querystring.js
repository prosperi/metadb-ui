import qs from 'querystring'
import assign from 'object-assign'

export default function formatSearchQuerystring (query, facets, options) {
	const opts = assign({}, {
		q: query || '',
	}, options)

	if (facets) {
		const facetKeys = Object.keys(facets)

		if (facetKeys.length) {
			facetKeys.forEach(function (facet) {
				const key = facetQsKey(facet)
				opts[key] = facets[facet]
			})
		}
	}

	return qs.stringify(opts)
}

function facetQsKey (facet) {
	return 'f[' + facet + '][]'
}
