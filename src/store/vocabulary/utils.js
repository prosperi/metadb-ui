export const camelCase = str => {
	if (!str)
		return ''

	if (typeof str !== 'string')
		str = '' + str

	return str.replace(/[^0-9a-zA-Z\s]/g, '')
		.replace(/\s+/, ' ')
		.toLowerCase()
		.split(' ')
		.map((w, i) => {
			if (i === 0) return w
			return w.substr(0,1).toUpperCase() + w.substr(1)
		}).join('')
}

export const createAbsolutePath = data => (
	`${process.env.API_BASE_URL}/vocabularies/${camelCase(data.label[0])}.json`
)

export const mockMintAuthUri = val => (
	`${process.env.AUTH_BASE_URL}/${camelCase(val)}`
)
