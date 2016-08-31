import assign from 'object-assign'

import {
	ADD_TERM_TO_VOCABULARY,
	FETCHING_VOCABULARY_TERMS,
	RECEIVE_VOCABULARY_TERMS,
	REMOVE_TERM_FROM_VOCABULARY,
} from '../actions/constants'

export default function activeVocabularyTermsReducer (state, action) {
	if (typeof state === 'undefined')
		return {}

	switch (action.type) {
		case ADD_TERM_TO_VOCABULARY:
			return addTermToVocabulary(state, action)

		case FETCHING_VOCABULARY_TERMS:
			return {isFetching: true, data: []}

		case RECEIVE_VOCABULARY_TERMS:
			return receiveVocabularyTerms(state, action)

		case REMOVE_TERM_FROM_VOCABULARY:
			return removeTermFromVocabulary(state, action)

		default:
			return state
	}
}

// @ this point, the API call has already been made, so we're just
// adding the term to our state-store
function addTermToVocabulary (state, action) {
	const terms = [].concat(state.data, action.data)
	return assign({}, state, {data: terms})
}

function receiveVocabularyTerms (state, action) {
	return {
		data: action.data,
		fetchedAt: Date.now(),
		isFetching: false,
	}
}

function removeTermFromVocabulary (state, action) {
	const terms = state.data
	const index = action.index

	const data = [].concat(
		terms.slice(0, index),
		terms.slice(index + 1)
	)

	return assign({}, state, {data})
}
