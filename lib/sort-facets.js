export default function createFacetsSortFunction (direction, field) {
	const fields = ['hits', 'label', 'value']

	if (!field || fields.indexOf(field) === -1)
		field = 'hits'

	const sortAsc = field => (a, b) => a[field] - b[field]
	const sortDesc = field => (a, b) => b[field] - a[field]

	return direction === 'desc' ? sortDesc(field) : sortAsc(field)
}
