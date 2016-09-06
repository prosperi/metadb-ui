import assign from 'object-assign'
import {
	ADD_TERM_TO_VOCABULARY,
	BULK_EDIT_TERMS,
	FETCHING_ALL_VOCABULARIES,
	RECEIVE_ALL_VOCABULARIES,
	REMOVE_TERM_FROM_VOCABULARY,
	UPDATE_VOCABULARY,
} from '../actions/constants'

const findIndex = (arr, fn) => {
	for (let i = 0; i < arr.length; i++)
		if (fn(arr[i], i, arr))
			return i

	return -1
}

export default function vocabularyReducer (state, action) {
	if (typeof state === 'undefined') 
		return {}

	switch (action.type) {
		case ADD_TERM_TO_VOCABULARY:
			return addTermToVocab(state, action)

		case BULK_EDIT_TERMS:
			return bulkEditTerms(state, action)

		case FETCHING_ALL_VOCABULARIES:
			return fetchingAllVocabs(state, action)

		case RECEIVE_ALL_VOCABULARIES:
			return receiveAllVocabs(state, action)

		case REMOVE_TERM_FROM_VOCABULARY:
			return removeTermFromVocabulary(state, action)

		case UPDATE_VOCABULARY:
			return updateVocab(state, action)

		default:
			return state
	}
}

// active terms are managed in a separate state key (`activeVocabularyTerms`)
// but we should increment the `term_count` + save ourselves an API call
function addTermToVocab (state, action) {
	const uri = action.uri
	const idx = findIndex(state.data, v => v.uri === uri)
	const vocab = assign({}, state.data[idx])

	if (!vocab)
		return state

	vocab.term_count++

	const data = [].concat(
		state.data.slice(0, idx),
		vocab,
		state.data.slice(idx + 1)
	)

	return assign({}, state, {data})
}

function bulkEditTerms (state, action) {
	const idx = findIndex(state.data, v => v.uri === action.vocabulary.uri)

	if (!idx)
		return state

	const vocab = assign({}, state.data[idx])
	vocab.term_count = action.data.length

	const data = [].concat(
		state.data.slice(0, idx),
		vocab,
		state.data.slice(idx + 1)
	)

	return assign({}, state, {data})
}

function fetchingAllVocabs (/* state, action */) {
	return { isFetching: true }
}

function receiveAllVocabs (state, action) {
	const vocabs = action.data.vocabularies
	// const out = {}

	// vocabs.forEach((vocab, idx) => {
	// 	out[vocab.uri] = vocab
	// })

	return { 
		isFetching: false,
		fetchedAt: Date.now(),
		data: vocabs,
	}
}

function removeTermFromVocabulary (state, action) {
	const uri = action.uri
	const idx = findIndex(state.data, v => v.uri === uri)
	const vocab = assign({}, state.data[idx])

	if (!vocab)
		return state

	vocab.term_count--

	const data = [].concat(
		state.data.slice(0, idx),
		vocab,
		state.data.slice(idx + 1)
	)

	return assign({}, state, {data})
}

function updateVocab (state/*, action */) {

	return state	
}
