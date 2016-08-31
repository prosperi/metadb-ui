export default function createNewTerm (value) {
	if (!value) return

	return {
		uri: '',
		label: [value],
		pref_label: [value],
		alt_label: [],
		hidden_label: [],
	}
}
