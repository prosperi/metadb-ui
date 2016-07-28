import {
	HAS_VOCABULARY,
	RECEIVE_VOCABULARY,
} from './constants'

export const fetchVocabulary name => (dispatch, getState) => {
	const state = getState()

	if (state.vocabulary[name])
		return dispatch({ type: HAS_VOCABULARY, name })

	// otherwise, go get that vocab!
}
