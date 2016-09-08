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

const mockMintAuthUri = val => (
	`http://authority.lafayette.edu/ns/${camelCase(val)}`
)

export const createVocabulary = data => dispatch => {
	dispatch({
		type: CREATE_VOCABULARY_REQUEST,
	})

	const { name, description } = data
	
	const payload = {
		uri: mockMintAuthUri(name),
		label: [name],
		pref_label: [name],
		alt_label: [description],
	}

	return create(payload)
		.then(() => {
			
			// append `absolute_path` to the payload
			payload.absolute_path = (
				`${process.env.API_BASE_URL}/vocabularies/${camelCase(name)}.json`
			)

			dispatch({
				type: CREATE_VOCABULARY_RESPONSE_OK,
				data: payload,
			})
		})
		.catch(err => {
			dispatch({
				type: CREATE_VOCABULARY_RESPONSE_ERR,
				error: err,
			})
		})
}

export const deleteVocabulary = data => dispatch => {
	dispatch({type: DELETE_VOCABULARY_REQUEST})

	return deleteVocabulary(data)
		.then(() => {
			dispatch({
				type: DELETE_VOCABULARY_RESPONSE_OK,
				data,
			})
		})
		.catch(err => {
			dispatch({
				type: DELETE_VOCABULARY_RESPONSE_ERR,
				error: err,
			})
		})
}

export const fetchAllVocabularies = () => dispatch => {
	dispatch({
		type: FETCHING_ALL_VOCABULARIES,
	})

	getVocabularies()
		.then(vocabs => {
			dispatch({
				type: RECEIVE_ALL_VOCABULARIES,
				data: vocabs,
			})
		})
		//.catch(err => {})
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

	return get(abs)
		.then(data => {
			dispatch({
				type: RECEIVE_VOCABULARY,
				data,
			})
		})
		.catch(error => {
			dispatch({
				type: RECEIVE_VOCABULARY_ERROR,
				error,
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
