import camelCase from './camel-case'

export default function createNewTerm (value, vocabulary) {
	if (!value) return

	const cameled = camelCase(value)
	let uri = ''
	let abspath = ''

	if (vocabulary.uri)
		uri = `${vocabulary.uri}/${cameled}`

	if (vocabulary.absolute_path) {
		abspath = (
			`${vocabulary.absolute_path.replace(/\.json$/, '')}/${cameled}.json`
		)
	}

	return {
		uri,
		label: [value],
		pref_label: [value],
		alt_label: [],
		hidden_label: [],
		absolute_path: abspath,
	}
}
