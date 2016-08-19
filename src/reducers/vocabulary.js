import {
	FETCHING_ALL_VOCABULARIES,
	RECEIVE_ALL_VOCABULARIES,
} from '../actions/constants'

export default function vocabularyReducer (state, action) {
	if (typeof state === 'undefined') 
		return {}

	switch (action.type) {
		case FETCHING_ALL_VOCABULARIES:
			return fetchingAllVocabs(state, action)

		case RECEIVE_ALL_VOCABULARIES:
			return receiveAllVocabs(state, action)

		default:
			return state
	}
}

function fetchingAllVocabs (state, action) {
	return { isFetching: true }
}

function receiveAllVocabs (state, action) {
	const vocabs = action.data.vocabularies
	const out = {}

	vocabs.forEach((vocab, idx) => {
		out[vocab.uri] = vocab
	})

	return { 
		isFetching: false,
		fetchedAt: Date.now(),
		data: out,
	}
}
