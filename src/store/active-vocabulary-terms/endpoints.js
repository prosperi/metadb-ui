import { patch, put } from '../api'

// expects
export function addTerm (vocab, term) {
	const url = vocab.absolute_path
	const payload = {
		vocabulary: {
			terms: [term]
		}
	}

	return patch(url, payload)
}

export function patchTerm (vocab, term) {
	const url = vocab.absolute_path
	const data = {
		vocabulary: {
			terms: [term]
		}
	}

	return patch(url, data)
}

export function putTerms (vocab, terms) {
	const url = vocab.absolute_path
	const data = {
		vocabulary: {
			terms,
		}
	}

	return put(url, data)
}
