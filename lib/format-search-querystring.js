import qs from 'querystring'
import assign from 'object-assign'

export default function formatSearchQuerystring (query, facets, options) {
	const opts = assign({}, {
		q: query || '',
	}, options)

	if (!opts.q)
		delete opts.q

	if (facets) {
		const facetKeys = Object.keys(facets)

		if (facetKeys.length) {
			facetKeys.forEach(function (k) {
				const key = facetQsKey(k)
				opts[key] = facets[k].map(f => f.value)
			})
		}
	}

	return qs.stringify(opts)
}

function facetQsKey (facet) {
	return 'f[' + facet + '][]'
}
