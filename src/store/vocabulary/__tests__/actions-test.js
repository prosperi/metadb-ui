import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import {
	JSON_EXTENSION,
	VOCABULARY_PATH,
} from '../../api'

import * as actions from '../actions'

import { testVocabulary as VOCAB_DATA } from './data/vocabularies-with-terms'

const mockStore = configureMockStore([thunk])
const API_BASE = process.env.API_BASE_URL

const BASE_VOCABULARY_URL = `${API_BASE}${VOCABULARY_PATH}${JSON_EXTENSION}`

describe('Vocabulary actionCreator', function () {
	beforeEach(function () {
		if (!API_BASE)
			this.skip()
	})

	describe('#createVocabulary', function () {
		beforeEach(function () {
			fetchMock.post(
				BASE_VOCABULARY_URL,
				{ status: 200, body: {status: 'ok'} }
			)
		})

		afterEach(fetchMock.restore)

		const data = {
			label: ['Test Vocabulary'],
			alt_label: ['Test Description'],
			pref_label: [],
			hidden_label: [],
		}

		const store = mockStore({vocabularies: []})

		// the data we get back is the same as the full Vocab output
		// (minus the `terms` array)
		const expectData = {...VOCAB_DATA}
		delete expectData.terms

		const expectActions = [
			actions.creatingVocabulary(expectData),
			actions.createdVocabulary(expectData),
		]

		it('dispatches `creatingVocabulary` and `createdVocabulary`', function () {
			return store.dispatch(actions.createVocabulary(data))
				.then(() => {
					store.getActions().forEach((a, i) => {
						expect(a.type).to.equal(expectActions[i].type)
					})
				})
		})
	})

	describe('#deleteVocabulary', function () {
		before(function () {
			fetchMock.delete(
				VOCAB_DATA.absolute_path,
				{status: 200, body: {status: 'ok'}}
			)
		})

		after(fetchMock.restore)

		const store = mockStore({vocabularies: [VOCAB_DATA]})
		const expectActions = [
			actions.deletingVocabulary(VOCAB_DATA),
			actions.deletedVocabulary(VOCAB_DATA),
		]

		it('dispatches `deletingVocabulary` and `deletedVocabulary`', function () {
			return store.dispatch(actions.deleteVocabulary(VOCAB_DATA))
				.then(() => {
					expect(store.getActions()).to.deep.equal(expectActions)
				})
		})

		it('does not send data as part of the DELETE request', function () {
			const opts = fetchMock.lastOptions(VOCAB_DATA.absolute_path)
			expect(opts.body).to.be.empty
		})
	})

	describe('#fetchAllVocabularies', function () {
		beforeEach(function () {
			fetchMock.get(
				`${API_BASE}/vocabularies.json`,
				{
					vocabularies: [{...VOCAB_DATA}],
				}
			)
		})

		afterEach(fetchMock.restore)

		const store = mockStore({vocabularies: []})
		const expectActions = [
			actions.fetchingVocabularies(),
			actions.fetchedVocabularies([VOCAB_DATA]),
		]

		it('dispatches `fetchingVocabularies` and `fetchedVocabularies`', function () {
			return store.dispatch(actions.fetchAllVocabularies())
				.then(() => {
					expect(store.getActions()).to.deep.equal(expectActions)
				})
		})
	})

	describe('#updateVocabularyMetadata', function () {
		const DATA = {...VOCAB_DATA}
		delete DATA.terms

		const url = DATA.absolute_path

		beforeEach(function () {
			fetchMock.patch(url, {status: 200, body: {status: 'ok'}})
			fetchMock.patch('*', 404)
		})

		afterEach(fetchMock.restore)

		it('patches an update the API', function () {
			const store = mockStore({vocabularies: [DATA]})
			const data = {...DATA}
			data.hidden_label = [`A new hidden label - ${Date.now()}`]

			const expectActions = [
				actions.updatingVocabulary(data),
				actions.updatedVocabulary(data),
			]

			return store.dispatch(actions.updateVocabularyMetadata(data))
				.then(() => {
					expect(store.getActions()).to.deep.equal(expectActions)
				})
		})

		it('dispatches UPDATE_VOCABULARY_ERR when there is a problem', function () {
			const store = mockStore({vocabularies: [DATA]})
			const data = {...DATA}
			data.absolute_path = 'http://this.isnt.real.biz'

			return store.dispatch(actions.updateVocabularyMetadata(data))
				.then(() => {
					throw Error('this should have thrown an error')
				})
				.catch(() => {
					const axns = store.getActions()
					expect(axns).to.have.length(2)
					expect(axns[0].type).to.equal(actions.updatingVocabulary.toString())
					expect(axns[1].type).to.equal(actions.updatingVocabularyErr.toString())
					expect(axns[1].error).to.be.true
				})
		})
	})
})
