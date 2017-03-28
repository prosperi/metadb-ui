import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from '../actions'

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
		const EXPECTED_VOCAB_ONE_ACTIONS = [
			actions.fetchingAutocompleteTerms(VOCAB_ONE),
			actions.receiveAutocompleteTerms({
				terms: VOCAB_ONE.terms.map(t => t.pref_label[0]),
				vocabulary: VOCAB_ONE,
			})
		]

		const EXPECTED_VOCAB_TWO_ACTIONS = [
			actions.fetchingAutocompleteTerms(VOCAB_TWO),
			actions.receiveAutocompleteTerms({
				terms: VOCAB_TWO.terms.map(t => t.pref_label[0]),
				vocabulary: VOCAB_TWO,
			})
		]

		beforeEach(function () {
			fetchMock.get(VOCAB_ONE.absolute_path, VOCAB_ONE)
			fetchMock.get(VOCAB_TWO.absolute_path, VOCAB_TWO)
			fetchMock.get('*', 404)
		})

		afterEach(fetchMock.restore)

		it('fetches only the terms from a vocabulary', function () {
			const store = mockStore({autocompleteTerms: {}})
			const expectActions = EXPECTED_VOCAB_ONE_ACTIONS

			return store.dispatch(actions.fetchAutocompleteTerms(VOCAB_ONE))
				.then(() => {
					expect(store.getActions()).to.deep.equal(expectActions)
				})
		})

		it('dispatches `receiveAutocompleteTerms` for each vocabulary', function () {
			const store = mockStore({autocompleteTerms: {}})

			const expectActions = [].concat(
				EXPECTED_VOCAB_ONE_ACTIONS[0],
				EXPECTED_VOCAB_TWO_ACTIONS[0],
				EXPECTED_VOCAB_ONE_ACTIONS[1],
				EXPECTED_VOCAB_TWO_ACTIONS[1]
			)

			return store.dispatch(actions.fetchAutocompleteTerms(VOCAB_ONE))
				.then(store.dispatch(actions.fetchAutocompleteTerms(VOCAB_TWO)))
				.then(() => {
					expect(store.getActions()).to.deep.equal(expectActions)
				})
		})

		it('ignores duplicate vocab requests', function () {
			const store = mockStore({autocompleteTerms: {}})

			return store.dispatch(actions.fetchAutocompleteTerms(VOCAB_ONE))
				.then(store.dispatch(actions.fetchAutocompleteTerms(VOCAB_ONE)))
				.then(store.dispatch(actions.fetchAutocompleteTerms(VOCAB_TWO)))
				.then(store.dispatch(actions.fetchAutocompleteTerms(VOCAB_ONE)))
				.then(() => {
					expect(fetchMock.calls().matched).to.have.length(2)
				})
		})

		it('ignores previously fetched vocabularies in state', function () {
			const store = mockStore({autocompleteTerms: {
				[VOCAB_ONE.uri]: VOCAB_ONE.terms.map(t => t.pref_label[0])
			}})

			return store.dispatch(actions.fetchAutocompleteTerms(VOCAB_ONE))
			.then(() => {
				expect(fetchMock.calls().matched).to.have.length(0)
			})
		})
	})
})
