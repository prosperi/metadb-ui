import {
	CLEAR_VOCABULARIES,
	FETCH_VOCABULARY,
	HAS_VOCABULARY,
	RECEIVE_VOCABULARY,
	REMOVE_VOCABULARY,
	SEARCH_FIELDS,
} from './constants'

import { getVocabulary } from '../../lib/api'

export const clearVocabularies = () => dispatch => (
	dispatch({
		type: CLEAR_VOCABULARIES,
	})
)

export const fetchVocabulary = opts => (dispatch, getState) => {
	const state = getState()
	const uri = opts.uri
	const path = opts.relative_path
	const vocab = state.vocabulary[uri]

	// TODO: check for staleness
	if (vocab) return

	dispatch({
		type: FETCH_VOCABULARY,
		uri,
	})

	getVocabulary(path, function (err, res) {
		console.log(path, arguments)

		dispatch({
			type: RECEIVE_VOCABULARY,
			uri,
			data: res.terms.map(t => t.pref_label)
		})
	})
}

export const removeVocabulary = name => dispatch => (
	dispatch({
		type: REMOVE_VOCABULARY,
		name,
	})
)
