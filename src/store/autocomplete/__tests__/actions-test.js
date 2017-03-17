import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import {
	fetchAutocompleteTerms,
	receiveVocabularyTerms,
} from '../actions'

import {
	testVocabulary as VOCAB_ONE,
	anotherTestVocabulary as VOCAB_TWO,
} from '../../vocabulary/__tests__/data/vocabularies-with-terms'

const API_BASE = process.env.API_BASE_URL
const mockStore = configureMockStore([thunk])

describe('Autocomplete actionCreators', function () {
	beforeEach(function () {
		if (!API_BASE) {
			this.skip()
			return
		}
	})

	describe('#getAutocompleteTerms', function () {
		beforeEach(function () {
			fetchMock.get(VOCAB_ONE.absolute_path, VOCAB_ONE)
			fetchMock.get(VOCAB_TWO.absolute_path, VOCAB_TWO)
			fetchMock.get('*', 404)
		})

		afterEach(fetchMock.restore)

		it('fetches only the terms from a vocabulary', function () {
			const store = mockStore({autocompleteTerms: {}})
			const expectAction = [
				{
					type: receiveVocabularyTerms.toString(),
					payload: {
						terms: VOCAB_ONE.terms.map(t => t.pref_label[0]),
						vocabulary: VOCAB_ONE,
					}
				}
			]

			return store.dispatch(fetchAutocompleteTerms(VOCAB_ONE))
				.then(() => {
					const actions = store.getActions()
					expect(actions).to.deep.equal(expectAction)
				})
		})

		it('dispatches receiveVocabularyTerms for each vocabulary', function () {
			const store = mockStore({autocompleteTerms: {}})

			return store.dispatch(fetchAutocompleteTerms(VOCAB_ONE))
				.then(store.dispatch(fetchAutocompleteTerms(VOCAB_TWO)))
					.then(() => {
						const actions = store.getActions()
						expect(actions).to.have.length(2)

						actions.forEach(act => {
							expect(act.type).to.equal(receiveVocabularyTerms.toString())
						})
					})
		})

		it('ignores duplicate vocab requests', function () {
			const store = mockStore({autocompleteTerms: {}})

			return store.dispatch(fetchAutocompleteTerms(VOCAB_ONE))
				.then(store.dispatch(fetchAutocompleteTerms(VOCAB_ONE)))
				.then(store.dispatch(fetchAutocompleteTerms(VOCAB_TWO)))
				.then(store.dispatch(fetchAutocompleteTerms(VOCAB_ONE)))
				.then(() => {
					expect(store.getActions()).to.have.length(2)
					expect(fetchMock.calls().matched).to.have.length(2)
				})
		})

		it('ignores previously fetched vocabularies in state', function () {
			const store = mockStore({autocompleteTerms: {
				[VOCAB_ONE.uri]: VOCAB_ONE.terms.map(t => t.pref_label[0])
			}})

			return store.dispatch(fetchAutocompleteTerms(VOCAB_ONE))
			.then(() => {
				expect(fetchMock.calls().matched).to.have.length(0)
			})
		})
	})
})
