import { camelCase } from '../vocabulary/utils'

export const createNewTerm = (value, vocabulary) => {
	if (!value)
		return

	const cameled = camelCase(value)
	let uri = ''

	if (typeof vocabulary === 'string') {
		uri = `${vocabulary}/${cameled}`
	}

	else if (vocabulary.uri) {
		uri = `${vocabulary.uri}/${cameled}`
	}

	return {
		uri,
		label: [value],
		pref_label: [value],
		alt_label: [],
		hidden_label: [],
	}
}
