import { stringify } from 'blacklight-querystring'

export default function formatSearchQuerystring (query, facets, options) {
	if (!facets)
		facets = {}

	// blacklight-querystring#stringify expects a flat array of
	// facet values per group, so we'll need to map our facet
	// objects to just their values
	const facetKeys = Object.keys(facets)
	const mappedFacets = {}

	facetKeys.forEach(function (k) {
		mappedFacets[k] = facets[k].map(f => f.value)
	})

	return stringify({
		query,
		options,
		facets: mappedFacets,
	})
}
