import { handleActions } from 'redux-actions'
import findIndex from 'array-find-index'

import * as vocab from './actions'

const initialState = {
	isFetching: false,
	data: [],
}

export default handleActions({
	// [terms.addTermToVocabulary]: (state, action) => {},
	// [terms.bulkEditTerms]: (state, action) => {},

	[vocab.createdVocabulary]: (state, action) => {
		const vocabulary = { ...action.payload }
		vocabulary.term_count = 0

		return {
			...state,
			data: [].concat(state.data, vocabulary)
		}
	},

	[vocab.deletedVocabulary]: (state, action) => {
		const target = action.payload
		const { data } = state
		const idx = findIndex(data, v => v.uri === target.uri)

		if (idx === -1) {
			return state
		}

		const updated = [].concat(
			data.slice(0, idx),
			data.slice(idx + 1)
		)

		return {
			...state,
			data: updated,
		}
	},

	[vocab.fetchingVocabularies]: () => {
		return {
			...initialState,
			isFetching: true,
		}
	},

	[vocab.fetchedVocabularies]: (state, action) => {
		return {
			data: action.payload,
			fetchedAt: Date.now(),
			isFetching: false,
		}
	},

	// [terms.removeTermFromVocabulary]: (state, action) => {},

	[vocab.updatedVocabulary]: (state, action) => {
		const { data } = state
		const update = action.payload
		const idx = findIndex(data, v => v.uri === update.uri)

		// updated but not in vocabulary list?
		if (idx === -1) {
			return state
		}

		const updatedData = [].concat(
			data.slice(0, idx),
			update,
			data.slice(idx + 1)
		)

		return {
			...state,
			data: updatedData,
		}
	}
}, initialState)
