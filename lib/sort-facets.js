function sortNum (field, direction) {
	return function (a, b) {
		if (direction === 'desc')
			return a[field] - b[field]

		return b[field] - a[field]
	}
}

function sortStr (field, direction) {
	return function (a, b) {
		const aa = a[field].toLowerCase()
		const bb = b[field].toLowerCase()

		if (direction === 'desc')
			return aa < bb

		return bb > aa
	}
}

export default function createFacetsSortFunction (direction, field) {
	const fields = ['hits', 'label', 'value']

	if (!field || fields.indexOf(field) === -1)
		field = 'hits'

	if (field === 'hits')
		return sortNum(field, direction)

	return sortStr(field, direction)
}
