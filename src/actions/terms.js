import {
	ADD_TERM_TO_VOCABULARY,

	BULK_EDIT_TERMS,

	FETCHING_VOCABULARY_TERMS,
	
	RECEIVE_VOCABULARY_TERMS,
	RECEIVE_VOCABULARY_TERMS_ERROR,
	
	REMOVE_TERM_FROM_VOCABULARY,

	UPDATE_TERM,
} from '../constants'

import { 
	addTermToVocabulary as addTerm,
	fetchTerms,
	patchTerm,
	putTerms,
} from '../../lib/api/terms'

import createNewTerm from '../../lib/create-new-term'

function mintUri (vocab, term) {
	const authBaseUrl = vocab.uri
	const cameledTerm = term
		.replace(/[^0-9a-zA-Z\s]/g, '')
		.replace(/\s+/, ' ')
		.toLowerCase()
		.split(' ')
		.map((w, i) => {
			if (i === 0) return w
			return w.substr(0,1).toUpperCase() + w.substr(1)
		}).join('')

	return `${authBaseUrl}/${cameledTerm}`
}

// 1. creates the term object
// 2. makes an API request to add new term
// 3. dispatches:
//		1. ADD_TERM_TO_VOCABULARY
//	  2. UPDATE_VOCABULARY_TERM_COUNT

export const addTermToVocabulary = function (vocabData, term) {
	return dispatch => {
		const newTerm = createNewTerm(term)
		const uri = vocabData.uri

		// Eventually I expect this will be handled on the server, but until then,
		// a URI needs to be passed for the term to be accepted, so we'll create a
		// mock one.
		newTerm.uri = mintUri(vocabData, term)

		return addTerm(vocabData, newTerm, function (err /*, response */) {
			if (err) {
				// do something w/ the error!
			}

			return dispatch({
				type: ADD_TERM_TO_VOCABULARY,
				data: newTerm,
				uri,
				vocabulary: vocabData,
			})
		})
	}
}

export const bulkEditTermsInVocabulary = function (vocabData, terms) {
	return (dispatch, getState) => {
		
		const prevTerms = getState().activeVocabularyTerms.data
		
		// cut down on the # of array traversals by building an index
		// `{ termUri: indexInPrevTerms }`
		const indexed = {}
		prevTerms.forEach((term, index) => (
			indexed[term.pref_label[0]] = index
		))

		const updates = terms.map(term => {
			const idx = indexed[term]

			if (typeof idx !== 'undefined')
				return prevTerms[idx]
			
			return createNewTerm(term, vocabData)
		})

		return putTerms(vocabData, updates, function (err) {
			if (err) {
				// do something w/ the error
			}

			return dispatch({
				type: BULK_EDIT_TERMS,
				terms: updates,
				vocabulary: vocabData,
			})
		})
	}
}

export const fetchTermsFromVocabulary = vocabData => dispatch => {
	dispatch({
		type: FETCHING_VOCABULARY_TERMS, 
		vocabulary: vocabData,
	})

	return fetchTerms(vocabData, function (err, results) {
		if (err) {
			return dispatch({
				type: RECEIVE_VOCABULARY_TERMS_ERROR,
				error: err,
				vocabulary: vocabData,
			})
		}

		return dispatch({
			type: RECEIVE_VOCABULARY_TERMS,
			data: results,
			vocabulary: vocabData,
		})
	})
}

// currently, the way we can remove a term is by omitting it
// in a PUT request of terms. In the future, a `/terms` API
// might open up so that only a DELETE request to an absolute_path
// would be needed to remove a term
export const removeTermFromVocabulary = function (vocabData, termData, index) {
	return (dispatch, getState) => {
		const termsList = getState().activeVocabularyTerms.data
		const terms = [].concat(
			termsList.slice(0, index),
			termsList.slice(index + 1)
		)

		return putTerms(vocabData, terms, function (err) {
			if (err) {
				// do something with the error!
			}

			return dispatch({
				type: REMOVE_TERM_FROM_VOCABULARY,
				index,
				term: termData,
				vocabulary: vocabData,
			})
		})
	}
}

export const updateTermInVocabulary = function (_data) {
	return dispatch => {
		const { data, term, vocabulary } = _data

		patchTerm(vocabulary, data, function (err) {
			if (err) {
				throw Error('patchTerm error for updateTermInVocabulary')
			}

			return dispatch({
				type: UPDATE_TERM,
				previousPrefLabel: term,
				data,
				vocabulary,
			})
		})
	}
}
