import { createAction } from 'redux-actions'
import * as api from './endpoints'
import * as utils from './utils'

export const createdVocabulary = createAction('created vocabulary')
export const creatingVocabulary = createAction('creating vocabulary')
export const creatingVocabularyErr = createAction ('error creating vocabulary')
export const deletedVocabulary = createAction('deleted vocabulary')
export const deletingVocabulary = createAction('deleting vocabulary')
export const deletingVocabularyErr = createAction('error deleting vocabulary')
export const fetchedVocabularies = createAction('fetched vocabularies')
export const fetchingVocabularies = createAction('fetching vocabularies')
export const fetchingVocabulariesErr = createAction('error fetching vocabularies')
export const updatedVocabulary = createAction('updated vocabulary')
export const updatingVocabulary = createAction('updating vocabulary')
export const updatingVocabularyErr = createAction('error updating vocabulary')

export const createVocabulary = data => {
	return dispatch => {
		dispatch(creatingVocabulary(data))

		const name = data.label[0]
		const vocabPayload = {
			...data,
			uri: utils.mockMintAuthUri(name),
			pref_label: data.label,
		}

		return api.createVocabulary(vocabPayload)
			.then(() => {
				vocabPayload.absolute_path = utils.createAbsolutePath(vocabPayload)
				dispatch(createdVocabulary(vocabPayload))
			})
			.catch(error => {
				dispatch(creatingVocabularyErr(error))
			})
	}
}

export const deleteVocabulary = data => {
	return dispatch => {
		dispatch(deletingVocabulary(data))

		return api.deleteVocabulary(data)
			.then(() => { dispatch(deletedVocabulary(data)) })
			.catch(error => { dispatch(deletingVocabularyErr(error))})
	}
}

export const fetchVocabularies = () => {
	return dispatch => {
		dispatch(fetchingVocabularies())

		return api.getVocabularies()
			.then(res => res.vocabularies)
			.then(res => { dispatch(fetchedVocabularies(res)) })
			.catch(error => { dispatch(fetchingVocabulariesErr(error)) })
	}
}

export const fetchAllVocabularies = fetchVocabularies

export const updateVocabularyMetadata = data => {
	return dispatch => {
		dispatch(updatingVocabulary(data))

		return api.updateVocabulary(data)
			.then(() => { dispatch(updatedVocabulary(data)) })
			.catch(error => { dispatch(updatingVocabularyErr(error)) })
	}
}
