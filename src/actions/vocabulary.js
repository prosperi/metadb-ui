import {
	CREATE_VOCABULARY_REQUEST,
	CREATE_VOCABULARY_RESPONSE_ERR,
	CREATE_VOCABULARY_RESPONSE_OK,

	DELETE_VOCABULARY_REQUEST,
	DELETE_VOCABULARY_RESPONSE_ERR,
	DELETE_VOCABULARY_RESPONSE_OK,

	FETCHING_ALL_VOCABULARIES,
	FETCHING_VOCABULARY,
	RECEIVE_ALL_VOCABULARIES,
	RECEIVE_VOCABULARY,
	RECEIVE_VOCABULARY_ERROR,
	UPDATE_VOCABULARY,
} from '../constants'

import { get } from '../../lib/api/request'
import { 
	createVocabulary as create,
	getVocabularies,
} from '../../lib/api'
import isFresh from '../../lib/is-fresh'
import camelCase from '../../lib/camel-case'

const STALE_TIME = 60 * 1000

const mockMintAuthUri = vocab => {
	const pref = vocab.pref_label[0]
	const camelized = camelCase(pref)

	return `http://authority.lafayette.edu/ns/${camelized}`
}

export const createVocabulary = data => dispatch => {
	dispatch({
		type: CREATE_VOCABULARY_REQUEST,
	})

	if (!data.uri)
		data.uri = mockMintAuthUri(data)

	// `res` is currently `{"status":"ok"}`, so no need to include it
	create(data, (err) => {
		// handle error
		if (err) {
			return dispatch({
				type: CREATE_VOCABULARY_RESPONSE_ERR,
				error: err,
			})
		}

		return dispatch({
			type: CREATE_VOCABULARY_RESPONSE_OK,
			data,
		})
	})
}

export const deleteVocabulary = data => dispatch => {
	dispatch({type: DELETE_VOCABULARY_REQUEST})

	return deleteVocabulary(data, err => {
		if (err) {
			return dispatch({
				type: DELETE_VOCABULARY_RESPONSE_ERR,
				error: err,
			})
		}

		return dispatch({
			type: DELETE_VOCABULARY_RESPONSE_OK,
			data,
		})
	})
}

export const fetchAllVocabularies = () => dispatch => {
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

export const updateVocabulary = (uri, key, index, value) => dispatch => {
	return dispatch({
		type: UPDATE_VOCABULARY,
		index,
		key,
		uri,
		value,
	})
}
