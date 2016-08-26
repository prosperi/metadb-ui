import {
	ADD_TERM_TO_VOCABULARY,
	ADD_EMPTY_VALUE_TO_TERM,
	FETCHING_TERMS,
	RECEIVE_TERMS,
	RECEIVE_TERMS_ERROR,
	REMOVE_VALUE_FROM_TERM,
} from './constants'

import { get } from '../../lib/api/request'
import isFresh from '../../lib/is-fresh'

// older than a minute is stale, let's say
const STALE_TIME = 60 * 1000

export const addTermToVocabulary = data => (dispatch, getState) => {
	const terms = getState().terms
	const uri = data.uri
	const term = data.term

	const vocab = terms[uri]

	// add some error handling / fetch vocab
	if (!vocab) {
		return
	}

	const found = terms[uri].data.find(t => t.pref_label.indexOf(pref) > -1)

	if (index)
		return

	return dispatch({
		type: ADD_TERM_TO_VOCABULARY,
		uri: data.uri,
		value: data.term,
	})
}

export const addEmptyValueToTerm = data => dispatch => {
	return dispatch({
		type: ADD_EMPTY_VALUE_TO_TERM,
		pref_label: data.pref_label,
		key: data.key,
		vocabularyUri: data.vocabularyUri,
	})
}

export const fetchTerms = data => (dispatch, getState) => {
	const terms = getState().terms
	const uri = data.uri
	const absPath = data.absolute_path

	if (terms[uri] && terms[uri].isFetching) {
		return
	}

	if (isFresh(terms[uri], STALE_TIME)) {
		return
	}

	dispatch({
		type: FETCHING_TERMS,
		uri,
	})
	
	// TODO: straighten out absolute/relative path
	get(absPath, (err, results) => {
		if (err) {
			return dispatch({
				type: RECEIVE_TERMS_ERROR,
			})
		}

		dispatch({
			type: RECEIVE_TERMS,
			data: results.terms,
			uri,
		})
	})
}
