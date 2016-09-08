import { get, patch, put } from './request'

// expects 
export function addTermToVocabulary (vocab, term) {
	const url = vocab.absolute_path
	const payload = {
		vocabulary: {
			terms: [term]
		}
	}

	return patch(url, payload)
}

export function fetchTerms (vocab) {
	const url = vocab.absolute_path
	
	return get(url).then(function (result) { return result.terms })
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
