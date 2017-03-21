import { handleActions } from 'redux-actions'
import * as util from './utils'
import * as msg from '../../messages'
import * as notifications from './actions'

import * as terms from '../active-vocabulary-terms/actions'
import * as batch from '../batch/actions'
import * as search from '../search/actions'
import * as vocab from '../vocabulary/actions'

export default handleActions({
	// handle notification actions first
	[notifications.clearNotification]: (state, action) => {
		if (typeof action.payload === 'undefined') {
			return state
		}

		let index = action.payload

		if (typeof index === 'string') {
			index = Number(index)
		}

		if (index >= state.length) {
			return state
		}

		return [].concat(
			state.slice(0, index),
			state.slice(index + 1)
		)
	},

	// then the rest
	[batch.batchUpdatingWorks]: (
		util.bulkMessageReducer(msg.BATCH_UPDATE, msg.BATCH_UPDATE_WITH_COUNT)
	),

	[batch.batchUpdatedWorks]: (
		util.bulkMessageReducer(msg.BATCH_UPDATE_OK, msg.BATCH_UPDATE_OK_WITH_COUNT)
	),

	[batch.batchUpdatingWorksErr]: (state, action) => {
		const data = {
			message: action.error.message,
		}

		return [].concat(state, util.errorMessage(msg.BATCH_UPDATE_ERR, data))
	},

	[search.fetchingSearchErr]: (state, action) => {
		const data = {
			message: action.error.message,
		}

		return [].concat(state, util.errorMessage(msg.RECEIVE_SEARCH_ERR, data))
	},

	[terms.addTermToVocabularyErr]: (state, action) => {
		const data = {
			term: action.error.term,
			message: action.error.message,
		}
		return [].concat(state,
			util.errorMessage(msg.CREATE_TERM_ERROR, data)
		)
	},

	[terms.fetchingVocabularyTermsErr]: (state, action) => {
		const data = {
			message: action.error.message
		}

		return [].concat(state,
			util.errorMessage(msg.RECEIVE_VOCABULARY_TERMS_ERR, data)
		)
	},

	[terms.updatingTermInVocabularyErr]: (state, action) => {
		const { message, termLabel, vocabulary } = action.error

		const data = {
			message,
			term: termLabel,
			vocabulary: vocabulary.pref_label[0] || vocabulary.uri || 'Unknown Vocabulary',
		}

		return [].concat(state,
			util.errorMessage(msg.UPDATE_TERM_RESPONSE_ERR, data)
		)
	},

	[vocab.createdVocabulary]: (
		util.vocabularyMessageReducer(msg.CREATE_VOCABULARY_SUCCESS)
	),

	[vocab.creatingVocabularyErr]: (
		util.vocabularyMessageReducer(msg.CREATE_VOCABULARY_ERR)
	),

	[vocab.deletedVocabulary]: (
		util.vocabularyMessageReducer(msg.DELETE_VOCABULARY_SUCCESS)
	),

	[vocab.deletingVocabularyErr]: (
		util.vocabularyMessageReducer(msg.DELETE_VOCABULARY_ERR)
	),

	[vocab.fetchingVocabulariesErr]: (
		util.vocabularyMessageReducer(msg.FETCHING_VOCABULARIES_ERR)
	),

	[vocab.updatedVocabulary]: (
		util.vocabularyMessageReducer(msg.UPDATE_VOCABULARY_SUCCESS)
	),

	[vocab.updatingVocabularyErr]: (
		util.vocabularyMessageReducer(msg.UPDATE_VOCABULARY_ERR)
	),

}, [])
