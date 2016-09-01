import { get, patch, put } from './request'

// expects 
export function addTermToVocabulary (vocab, term, callback) {
	const url = vocab.absolute_path
	const payload = {
		vocabulary: {
			terms: [term]
		}
	}

	return patch(url, payload, function (err, response) {
		callback(err, response)
	})
}

export function fetchTerms (vocab, callback) {
	const url = vocab.absolute_path
	
	return get(url, function (err, result) {
		if (err)
			return callback(err)

		const terms = result.terms
		return callback(null, terms)
	})
}

export function patchTerm (vocab, term, callback) {
	const url = vocab.absolute_path
	const data = {
		vocabulary: {
			terms: [term]
		}
	}

	return patch(url, data, function (err, result) {
		if (err) {
			console.log('error!', err)
			return callback(err)
		}

		return callback(null, result)
	})
}

export function putTerms (vocab, terms, callback) {
	const url = vocab.absolute_path
	const data = {
		vocabulary: {
			terms,
		}
	}

	return put(url, data, function (err, result) {
		if (err)
			return callback(err)
		return callback(null, result)
	})
}

export function updateVocabulary (vocab, callback) {
	const url = vocab.absolute_path
	const data = {
		vocabulary: vocab
	}

	return put(url, data, function (err, result) {
		if (err) 
			return callback(err)

		return callback(null, result)
	})
}
