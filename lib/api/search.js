import { get } from './request'

export function search (querystring) {
	// prepend `utf8=✓` to query string manually, as `require('querystring')`
	// will encode the checkmark

	const url = `/catalog.json?utf8=✓&${querystring}`
	return get(url)
}
