import qs from 'querystring'

export default function parseSearchQuerystring (querystring) {
	const parsed = qs.parse(querystring.replace(/^\?/, ''))
	const facets = {}
	const options = {}
	let query = null
	let k, key

	for (k in parsed) {
		// f[facet_name]=value
		if (k[0] === 'f' && k[1] === '[') {
			key = k.replace(/^f\[/, '').replace(/\]\[\]$/, '')
			facets[key] = [].concat(parsed[k])
		}
		
		// q=query+string
		else if (k === 'q')
			query = parsed[k]
		
		// per_page=25
		else
			options[k] = parsed[k]
	}

	return {facets, options, query}
}
