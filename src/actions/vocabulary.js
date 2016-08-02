import {
	CLEAR_VOCABULARIES,
	HAS_VOCABULARY,
	RECEIVE_VOCABULARY,
	REMOVE_VOCABULARY,
	SEARCH_FIELDS,
} from './constants'

export const clearVocabularies = () => dispatch => (
	dispatch({
		type: CLEAR_VOCABULARIES,
	})
)

export const fetchVocabulary = name => (dispatch, getState) => {
	const state = getState()

	if (state.vocabulary[name])
		return dispatch({ type: HAS_VOCABULARY, name })

	if (name === SEARCH_FIELDS) {
		return dispatch({
			type: RECEIVE_VOCABULARY,
			name: name,
			data: [
				'coverage.location.sender',
				'coverage.location.recipient',
				'coverage.location.producer',
				'coverage.location.postmark',
				'date.period',
				'title.french',
				'title.german',
				'subject.theme',
				'description.critical',
				'description.text.french',
				'description.text.german',
				'description.inscription.french',
				'description.inscription.german',
				'date.image',
				'subject.ocm',
				'coverage.location.image',
				'date.postmark',
			],
		})
	}

	// otherwise, go get that vocab!
}

export const removeVocabulary = name => dispatch => (
	dispatch({
		type: REMOVE_VOCABULARY,
		name,
	})
)
