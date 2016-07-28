import {
	CLEAR_VOCABULARIES,
	HAS_VOCABULARY,
	RECEIVE_VOCABULARY,
	REMOVE_VOCABULARY,
} from './constants'

export const clearVocabularies () => dispatch => (
	dispatch({
		type: CLEAR_VOCABULARIES,
	})
)

export const fetchVocabulary name => (dispatch, getState) => {
	const state = getState()

	if (state.vocabulary[name])
		return dispatch({ type: HAS_VOCABULARY, name })

	// otherwise, go get that vocab!
}

export const removeVocabulary name => dispatch => (
	dispatch({
		type: REMOVE_VOCABULARY,
		name,
	})
)
