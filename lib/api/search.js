import { get } from './request'
import formatSearchQuerystring from '../format-search-querystring'

export function search (query, facets, options) {
	const qs = formatSearchQuerystring(query, facets, options)

	// prepend `utf8=✓` to query string manually, as `require('querystring')`
	// will encode the checkmark
	const url = `/catalog.json?utf8=✓&${qs}`

	return get(url)
}
