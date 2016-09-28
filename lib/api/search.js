import { get } from './request'

const searchBase = process.env.SEARCH_BASE_URL || ''

export function search (querystring) {
	// prepend `utf8=✓` to query string manually, as `require('querystring')`
	// will encode the checkmark

	const url = `${searchBase}?utf8=✓&${querystring}`
	return get(url)
}
