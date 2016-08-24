import {
	FETCHING_ALL_VOCABULARIES,
	FETCHING_VOCABULARY,
	RECEIVE_ALL_VOCABULARIES,
	RECEIVE_VOCABULARY,
} from './constants'

import { get } from '../../lib/api/request'
import { getVocabularies } from '../../lib/api'
import isFresh from '../../lib/is-fresh'

const STALE_TIME = 60 * 1000

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

export const fetchVocabulary = data => (dispatch, getState) => {
	const vocabs = getState().vocabulary
	const uri = data.uri
	const abs = data.absolute_path
	const vocab = vocabs[uri]

	if (vocab && vocab.isFetching)
		return

	if (isFresh(vocab, STALE_TIME))
		return

	dispatch({
		type: FETCHING_VOCABULARY,
		uri,
	})

	return get(abs, (err, results) => {
		if (err) {
			return dispatch({
				type: RECEIVE_VOCABULARY_ERROR,
				err,
			})
		}

		return dispatch({
			type: RECEIVE_VOCABULARY,
			data: results,
		})
	})
}

export const updateVocabulary = (uri, key, index, val) => dispatch => {
	return dispatch({
		type: UPDATE_VOCABULARY,
		index,
		key,
		uri,
		value,
	})
}
