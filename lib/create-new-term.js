import camelCase from './camel-case'

export default function createNewTerm (value, vocabulary) {
	if (!value) return

	let uri = ''

	if (vocabulary.uri)
		uri = `${vocabulary.uri}/${camelCase(value)}`

	return {
		uri,
		label: [value],
		pref_label: [value],
		alt_label: [],
		hidden_label: [],
	}
}
