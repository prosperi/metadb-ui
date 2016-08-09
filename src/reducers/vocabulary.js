import {
	CLEAR_VOCABULARIES,
	FETCH_VOCABULARY,
	RECEIVE_VOCABULARY,
} from '../actions/constants'

import assign from 'object-assign'

export default function vocabularyReducer (state, action) {
	if (typeof state === 'undefined') 
		state = {}

	switch (action.type) {
		case CLEAR_VOCABULARIES:
			return {}

		case FETCH_VOCABULARY:
			return fetchVocabulary(state, action)

		case RECEIVE_VOCABULARY:
			return receiveVocabulary(state, action)

		default:
			return state
	}
}

function fetchVocabulary (state, action) {
	const merge = {}
	merge[action.uri] = {
		isFetching: true,
		terms: [],
	}

	return assign({}, state, merge)
}


function receiveVocabulary (state, action) {
	console.log('received vocab', action)
	const merge = {}
	merge[action.uri] = {
		fetchedAt: Date.now(),
		isFetching: false,
		terms: action.data,
	}

	return assign({}, state, merge)
}
