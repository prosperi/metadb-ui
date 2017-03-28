// reminder: this is the `activeVocabularyTerms` reducer
// meaning that its scope is limited to that of a vocabulary whose
// terms are being edited.

import { handleActions } from 'redux-actions'
import findIndex from 'array-find-index'
import * as actions from './actions'

const notInVocabulary = (state, action) => (
	action.payload.vocabulary.uri !== state.vocabularyUri
)

export default handleActions({
	[actions.addedTermToVocabulary]: (state, action) => {
		if (notInVocabulary(state, action)) {
			return state
		}

		const data = [].concat(state.data, action.payload.term)

		return {
			...state,
			data,
		}
	},

	[actions.bulkEditedTerms]: (state, action) => {
		if (notInVocabulary(state, action)) {
			return state
		}

		return {
			...state,
			data: action.payload.terms,
		}
	},

	[actions.fetchedVocabularyTerms]: (state, action) => {
		return {
			data: action.payload.terms,
			fetchedAt: Date.now(),
			isFetching: false,
			vocabularyUri: action.payload.vocabulary.uri
		}
	},

	[actions.fetchingVocabularyTerms]: (state, action) => {
		return {
			isFetching: true,
			vocabularyUri: action.payload.vocabulary.uri,
		}
	},

	[actions.removedTermFromVocabulary]: (state, action) => {
		if (notInVocabulary(state, action)) {
			return state
		}

		const terms = state.data
		const index = action.payload.index

		const data = [].concat(
			terms.slice(0, index),
			terms.slice(index + 1)
		)

		return {
			...state,
			data,
		}
	},

	[actions.updatedTermInVocabulary]: (state, action) => {
		if (notInVocabulary(state, action)) {
			return state
		}

		const { previousPrefLabel, data } = action.payload

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

		return {
			...state,
			data: update,
		}
	}
}, {})
