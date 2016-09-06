import assign from 'object-assign'

import {
	ADD_TERM_TO_VOCABULARY,
	BULK_EDIT_TERMS,
	FETCHING_VOCABULARY_TERMS,
	RECEIVE_VOCABULARY_TERMS,
	REMOVE_TERM_FROM_VOCABULARY,
	UPDATE_TERM,
} from '../actions/constants'

const findIndex = function (arr, fn) {
	for (let i = 0; i < arr.length; i++)
		if (fn(arr[i], i, arr))
			return i

	return -1
}

export default function activeVocabularyTermsReducer (state, action) {
	if (typeof state === 'undefined')
		return {}

	switch (action.type) {
		case ADD_TERM_TO_VOCABULARY:
			return addTermToVocabulary(state, action)

		case BULK_EDIT_TERMS:
			return bulkEditTerms(state, action)

		case FETCHING_VOCABULARY_TERMS:
			return {isFetching: true, data: []}

		case RECEIVE_VOCABULARY_TERMS:
			return receiveVocabularyTerms(state, action)

		case REMOVE_TERM_FROM_VOCABULARY:
			return removeTermFromVocabulary(state, action)

		case UPDATE_TERM:
			return updateTerm(state, action)

		default:
			return state
	}
}

// @ this point, the API call has already been made, so we're just
// adding the term to our state-store
function addTermToVocabulary (state, action) {
	if (action.vocabulary.uri !== state.vocabularyUri)
		return state

	const terms = [].concat(state.data, action.data)
	return assign({}, state, {data: terms})
}

// TODO: you might want to do some sanity checking _just to be sure_
// the terms being bulkEdited are those in ActiveVocabularyTerms
function bulkEditTerms (state, action) {
	if (action.vocabulary.uri !== state.vocabularyUri)
		return state

	return assign({}, state, {data: action.data})
}

function receiveVocabularyTerms (state, action) {
	return {
		data: action.data,
		fetchedAt: Date.now(),
		isFetching: false,
		vocabularyUri: action.vocabulary.uri,
	}
}

function removeTermFromVocabulary (state, action) {
	if (action.vocabulary.uri !== state.vocabularyUri)
		return

	const terms = state.data
	const index = action.index

	const data = [].concat(
		terms.slice(0, index),
		terms.slice(index + 1)
	)

	return assign({}, state, {data})
}

function updateTerm (state, action) {
	if (action.vocabulary.uri !== state.vocabularyUri)
		return state

	const { previousPrefLabel, data } = action

	const bundle = state.data
	const index = findIndex(bundle, t => (
		t.pref_label.indexOf(previousPrefLabel) > -1
	))

	if (index === -1) {
		return state
	}

	const update = [].concat(
		bundle.slice(0, index),
		data,
		bundle.slice(index + 1)
	)

	return assign({}, state, {data: update})
}
