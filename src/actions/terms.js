import {
	ADD_TERM_TO_VOCABULARY,
	ADD_EMPTY_VALUE_TO_TERM,

	FETCHING_VOCABULARY_TERMS,
	
	RECEIVE_VOCABULARY_TERMS,
	RECEIVE_VOCABULARY_TERMS_ERROR,
	
	REMOVE_TERM_FROM_VOCABULARY,
	REMOVE_VALUE_FROM_TERM,

	UPDATE_TERM,
} from './constants'

import { get } from '../../lib/api/request'
import { 
	addTermToVocabulary as addTerm,
	fetchTerms,
	patchTerm,
	putTerms,
} from '../../lib/api/terms'

import isFresh from '../../lib/is-fresh'
import createNewTerm from '../../lib/create-new-term'

const findInArray = function (arr, fn) {
	for (let i = 0; i < arr.length; i++)
		if (fn(arr[i], i, arr))
			return arr[i]

	return null
}

const findIndexInArray = function (arr, fn) {
	for (let i = 0; i < arr.length; i++)
		if (fn(arr[i], i, arr))
			return i

	return -1
}

// older than a minute is stale, let's say
const STALE_TIME = 60 * 1000

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

export const addTermToVocabulary = function (vocab, term) {
	return dispatch => {
		const newTerm = createNewTerm(term)
		const uri = vocab.uri

		// Eventually I expect this will be handled on the server, but until then,
		// a URI needs to be passed for the term to be accepted, so we'll create a
		// mock one.
		newTerm.uri = mintUri(vocab, term)

		return addTerm(vocab, newTerm, function (err, response) {
			if (err) {
				// do something w/ the error!
			}

			return dispatch({
				type: ADD_TERM_TO_VOCABULARY,
				data: newTerm,
				uri,
			})
		})
	}
}

export const bulkEditTermsInVocabulary = function (vocabData, terms) {
	return dispatch => {

		
	}
}

export const fetchTermsFromVocabulary = vocabData => (dispatch, getState) => {
	dispatch({type: FETCHING_VOCABULARY_TERMS})
	return fetchTerms(vocabData, function (err, results) {
		if (err) {
			return dispatch({
				type: RECEIVE_VOCABULARY_TERMS_ERROR,
				error: err,
			})
		}

		return dispatch({
			type: RECEIVE_VOCABULARY_TERMS,
			data: results,
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
		const uri = vocabData.uri

		return putTerms(vocabData, terms, function (err, response) {
			if (err) {
				// do something with the error!
			}

			return dispatch({
				type: REMOVE_TERM_FROM_VOCABULARY,
				index,
				uri,
			})
		})
	}
}

export const updateTermInVocabulary = function (_data) {
	return (dispatch, getState) => {
		const { data, term, vocabulary } = _data

		patchTerm(vocabulary, data, function (err, response) {
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
