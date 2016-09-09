import { expect } from 'chai'
import * as actions from '../autocomplete'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import {
	RECEIVE_AUTOCOMPLETE_TERMS,
} from '../../constants'

import {
	testVocabulary as VOCAB_ONE,
	anotherTestVocabulary as VOCAB_TWO,
} from './data/vocabularies-with-terms'

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
					type: RECEIVE_AUTOCOMPLETE_TERMS,
					terms: VOCAB_ONE.terms.map(t => t.pref_label[0]),
					uri: VOCAB_ONE.uri,
				}
			]

			return store.dispatch(actions.fetchAutocompleteTerms(VOCAB_ONE))
				.then(() => {
					const actions = store.getActions()
					expect(actions).to.deep.equal(expectAction)
				})
		})

		it('dispatches RECEIVE_AUTOCOMPLETE_TERMS for each vocabulary', function () {
			const store = mockStore({autocompleteTerms: {}})

			return store.dispatch(actions.fetchAutocompleteTerms(VOCAB_ONE))
				.then(store.dispatch(actions.fetchAutocompleteTerms(VOCAB_TWO)))
					.then(() => {
						const actions = store.getActions()
						expect(actions).to.have.length(2)

						actions.forEach(act => {
							expect(act.type).to.equal(RECEIVE_AUTOCOMPLETE_TERMS)
						})
					})
		})

		it('ignores duplicate vocab requests', function () {
			const store = mockStore({autocompleteTerms: {}})

			return store.dispatch(actions.fetchAutocompleteTerms(VOCAB_ONE))
				.then(store.dispatch(actions.fetchAutocompleteTerms(VOCAB_ONE)))
				.then(store.dispatch(actions.fetchAutocompleteTerms(VOCAB_TWO)))
				.then(store.dispatch(actions.fetchAutocompleteTerms(VOCAB_ONE)))
				.then(() => {
					expect(store.getActions()).to.have.length(2)
					expect(fetchMock.calls().matched).to.have.length(2)
				})
		})

		xit('ignores previously fetched vocabularies in state')
	})
})
