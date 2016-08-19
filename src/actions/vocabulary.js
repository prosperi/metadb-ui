import {
	FETCHING_ALL_VOCABULARIES,
	RECEIVE_ALL_VOCABULARIES,
} from './constants'

import { getVocabularies } from '../../lib/api'

// export const fetchVocabulary = (uri) => (dispatch, getState) => {
// 	const state = getState().vocabulary
// 	const vocab = state[uri]

// 	if (state[uri].data.length) {
// 		return dispatch({
// 			type: RECEIVE_VOCABULARY
// 		})
// 	}
// }

export const fetchAllVocabularies = () => (dispatch, getState) => {
	dispatch({
		type: FETCHING_ALL_VOCABULARIES,
	})

	getVocabularies((err, vocabs) => {
		if (err)
			throw err

		return dispatch({
			type: RECEIVE_ALL_VOCABULARIES,
			data: vocabs,
		})
	})
}
