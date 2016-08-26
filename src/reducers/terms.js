import assign from 'object-assign'
import createNewTerm from '../../lib/create-new-term'

import {
	ADD_TERM_TO_VOCABULARY,
	ADD_EMPTY_VALUE_TO_TERM,
	FETCHING_TERMS,
	RECEIVE_TERMS,
} from '../actions/constants'

export default function termsReducer (state, action) {
	if (typeof state === 'undefined')
		return {}

	switch (action.type) {
		case ADD_EMPTY_VALUE_TO_TERM:
			return addEmptyValueToTerm(state, action)

		case ADD_TERM_TO_VOCABULARY:
			return addTerm(state, action)

		case FETCHING_TERMS:
			return fetchTerms(state, action)

		case RECEIVE_TERMS:
			return receiveTerms(state, action)

		default:
			return state
	}
}

function findTermByPrefLabel (needle, haystack) {
	return haystack.find(t => t.pref_label.indexOf(needle) > -1)
}

function findTermIndexByPrefLaebl (needle, haystack) {
	return haystack.findIndex(t => t.pref_label.indexOf(needle) > -1)
}

function addEmptyValueToTerm (state, action) {
	const { pref_label, vocabularyUri, key } = action
	const data = state.data

	const terms = data[uri]
	
	const pref = action.pref_label
	const data = assign({}, state.data)
	const uri = action.vocabularyUri
	const key = action.key
	const terms = data[uri]

	const termIndex = findTermIndexByPrefLabel(pref, terms)

	terms[termIndex][key].push('')

}

function addTerm (state, action) {
	const uri = action.uri
	const value = action.value

	const terms = assign({}, state[uri])
	const term = createNewTerm(value)

	terms.data.push(term)

	const update = {}
	update[uri] = terms

	return assign({}, state, {update})
}

function fetchTerms (state, action) {
	const update = {}
	update[action.uri] = {
		isFetching: true,
	}

	return assign({}, state, update)
}

function receiveTerms (state, action) {
	const terms = action.data
	const uri = action.uri

	console.log('received terms!')

	const update = {}
	update[uri] = {
		fetchedAt: Date.now(),
		isFetching: false,
		data: action.data,
	}
	
	return assign({}, state, update)
}
