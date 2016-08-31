import {
	ADD_TERM_TO_VOCABULARY,
	ADD_EMPTY_VALUE_TO_TERM,

	FETCHING_VOCABULARY_TERMS,
	
	RECEIVE_VOCABULARY_TERMS,
	RECEIVE_VOCABULARY_TERMS_ERROR,
	
	REMOVE_TERM_FROM_VOCABULARY,
	REMOVE_VALUE_FROM_TERM,

	UPDATE_TERM_IN_VOCABULARY,
} from './constants'

import { get } from '../../lib/api/request'
import { 
	addTermToVocabulary as addTerm,
	fetchTerms,
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

// older than a minute is stale, let's say
const STALE_TIME = 60 * 1000

// 1. creates the term object
// 2. makes an API request to add new term
// 3. dispatches:
//		1. ADD_TERM_TO_VOCABULARY
//	  2. UPDATE_VOCABULARY_TERM_COUNT
//
// NOTE: I've been trying to stick with ES6 standards throughout,
// however, in order to bypass the XHR request, I'm binding a `this`
// object to the dispatcher during testing. When defining functions
// as shorthand-constants in ES6 (const func = () => {/* ... */}) no
// `this` object is actually attached, so `this.addTerm` will always
// be `undefined` even when bound.

export const addTermToVocabulary = function (vocab, term) {
	return dispatch => {
		const newTerm = createNewTerm(term)
		const uri = vocab.uri

		const cameledTerm = term.toLowerCase().split(' ').map((w, i) => {
			if (i === 0) return w
			return w.substr(0,1).toUpperCase() + w.substr(1)
		}).join('')

		newTerm.uri = `http://authority.lafayette.edu/ns/testVocab/${cameledTerm}`

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


// export const addTermToVocabulary = data => (dispatch, getState) => {
// 	const terms = getState().terms
// 	const uri = data.uri
// 	const term = data.term

// 	const vocab = terms[uri]

// 	// add some error handling / fetch vocab
// 	if (!vocab) {
// 		return
// 	}

// 	const found = terms[uri].data.find(t => t.pref_label.indexOf(pref) > -1)

// 	if (index)
// 		return

// 	return dispatch({
// 		type: ADD_TERM_TO_VOCABULARY,
// 		uri: data.uri,
// 		value: data.term,
// 	})
// }

export const addEmptyValueToTerm = data => dispatch => {
	return dispatch({
		type: ADD_EMPTY_VALUE_TO_TERM,
		pref_label: data.pref_label,
		key: data.key,
		vocabularyUri: data.vocabularyUri,
	})
}

export const updateTermInVocabulary = _data => dispatch => {
	const { uri, data, term } = _data

	// TODO: check to make sure `uri` exists in state

	return dispatch({
		type: UPDATE_TERM_IN_VOCABULARY,
		uri,
		data,
		term,
	})
}
