import { expect } from 'chai'
import * as actions from '../vocabulary'
import assign from 'object-assign'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import fetchMock from 'fetch-mock'

import {
	CREATE_VOCABULARY_REQUEST,
	CREATE_VOCABULARY_RESPONSE_OK,

	DELETE_VOCABULARY_REQUEST,
	DELETE_VOCABULARY_RESPONSE_OK,

	FETCHING_ALL_VOCABULARIES,
	RECEIVE_ALL_VOCABULARIES,
} from '../../constants'

import VOCAB_DATA from './data/vocabulary-with-terms'

const mockStore = configureMockStore([thunk])
const API_BASE = process.env.API_BASE_URL

describe('Vocabulary actionCreator', function () {
	describe('#createVocabulary', function () {
		before(function () {
			if (!API_BASE) {
				this.skip()
				return
			}

			fetchMock.post(
				`${API_BASE}/vocabularies.json`,
				{ status: 200, body: {status: 'ok'} }
			)
		})

		after(fetchMock.restore)

		const data = {
			name: 'Test Vocabulary',
			description: 'Test Description',
		}

		const store = mockStore({vocabularies: []})

		// the data we get back is the same as the full Vocab output
		// (minus the `terms` array)
		const expectData = assign({}, VOCAB_DATA)
		delete expectData.terms

		const expectActions = [
			{
				type: CREATE_VOCABULARY_REQUEST
			},
			{
				type: CREATE_VOCABULARY_RESPONSE_OK,
				data: expectData,
			}
		]

		it('dispatches CREATE_VOCABULARY_REQUEST{,_OK}', function () {
			return store.dispatch(actions.createVocabulary(data))
				.then(() => {
					expect(store.getActions()).to.deep.equal(expectActions)
				})
		})
	})

	describe('#deleteVocabulary', function () {
		before(function () {
			if (!API_BASE) {
				this.skip()
				return
			}

			fetchMock.delete(
				VOCAB_DATA.absolute_path,
				{status: 200, body: {status: 'ok'}}
			)
		})

		after(fetchMock.restore)

		const store = mockStore({vocabularies: [VOCAB_DATA]})
		const expectActions = [
			{
				type: DELETE_VOCABULARY_REQUEST,
			},
			{
				type: DELETE_VOCABULARY_RESPONSE_OK,
				data: VOCAB_DATA,
			}
		]

		it('dispatches DELETE_VOCABULARY_{REQUEST,RESPONSE_OK}', function () {
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
		before(function () {
			if (!API_BASE) {
				this.skip()
				return
			}

			fetchMock.get(
				`${API_BASE}/vocabularies.json`,
				{
					vocabularies: [assign({}, VOCAB_DATA)]
				}
			)
		})

		after(fetchMock.restore)

		const store = mockStore({vocabularies: []})
		const expectActions = [
			{
				type: FETCHING_ALL_VOCABULARIES
			},
			{
				type: RECEIVE_ALL_VOCABULARIES,
				data: [assign({}, VOCAB_DATA)]
			}
		]

		it('dispatches {FETCHING,RECEIVE}_ALL_VOCABULARIES', function () {
			return store.dispatch(actions.fetchAllVocabularies())
				.then(() => {
					expect(store.getActions()).to.deep.equal(expectActions)
				})	
		})
	})

	// at the moment, we're only using this to fetch terms, so it might
	// need to be revisited
	xdescribe('#fetchVocabulary', function () {
		beforeEach(function () {
			if (!API_BASE) {
				this.skip()
				return
			}

			fetchMock.get(
				`${API_BASE}/vocabularies/testVocab.json`,
				assign({}, VOCAB_DATA, {terms: []})
			)
		})

		afterEach(fetchMock.restore)

		it('dispatches {FETCHING,RECEIVE}_VOCABULARY')

		it('does not fetch if `isFetching` flag is true')

		it('does not fetch if fetched recently')
	})

	xdescribe('#updateVocabulary', function () {
		it('patches an update the API')
	})
})
