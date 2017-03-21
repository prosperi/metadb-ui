const apiBase = process.env.API_BASE_URL || 'https://metadb.stage.lafayette.edu/api'
const authBase = process.env.AUTH_BASE_URL || 'http://authority.lafayette.edu/ns'
const searchBase = process.env.SEARCH_BASE_URL || (apiBase + '/catalog.json')

module.exports = {
	API_BASE_URL: JSON.stringify(apiBase),
	AUTH_BASE_URL: JSON.stringify(authBase),
	SEARCH_BASE_URL: JSON.stringify(searchBase),
}
