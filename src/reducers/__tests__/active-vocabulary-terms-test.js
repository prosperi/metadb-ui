import { expect } from 'chai'
import termsReducer from '../active-vocabulary-terms'
import assign from 'object-assign'

import {
	ADD_TERM_TO_VOCABULARY,
	FETCHING_VOCABULARY_TERMS,
	RECEIVE_VOCABULARY_TERMS,
	REMOVE_TERM_FROM_VOCABULARY,
} from '../../actions/constants'

import createNewTerm from '../../../lib/create-new-term'

import * as originalState from './mocks/active-terms.json'

const originalStatePure = assign({}, originalState)

describe('activeVocabularyTermsReducer', function () {
	afterEach(function () {
		expect(originalState).to.deep.equal(originalStatePure)
	})

	it('returns an empty object when state is undefined', function () {
		const result = termsReducer()
		const toString = Object.prototype.toString

		expect(result).to.be.empty
		expect(toString.call(result)).to.equal('[object Object]')
	})

	describe('@ADD_TERM_TO_VOCABULARY', function () {
		it('appends newly-created term to the `data` object', function () {
			const term = 'whaaaa?'
			const created = createNewTerm(term)
			const action = {
				type: ADD_TERM_TO_VOCABULARY,
				data: created,
			}

			const result = termsReducer(originalState, action)

			expect(result.data.length).to.be.greaterThan(originalState.data.length)
			expect(result.data.length - originalState.data.length).to.equal(1)

			expect(result.data[result.data.length - 1]).to.deep.equal(created)
		})
	})

	describe('@FETCHING_VOCABULARY_TERMS', function () {
		const action = {type: FETCHING_VOCABULARY_TERMS}
		const result = termsReducer(originalState, action)
		
		it('toggles `isFetching` flag to true', function () {
			expect(originalState.isFetching).to.not.be.true
			expect(result.isFetching).to.be.true
		})

		it('sets `data` to an empty array', function () {
			expect(originalState.data).to.not.be.empty
			expect(result.data).to.be.empty
		})
	})

	describe('@RECEIVE_VOCABULARY_TERMS', function () {
		const action = {
			type: RECEIVE_VOCABULARY_TERMS,
			terms: [
				{uri: 'http://whatever.org'},
				{uri: 'http://whatever.org'},
			]
		}

		const result = termsReducer(originalState, action)

		it('replaces state data w/ new array of terms', function () {
			expect(result.data).to.not.deep.equal(originalState.data)
		})

		it('sets `isFetching` flag to false', function () {
			expect(result.isFetching).to.be.false
		})

		it('resets the `fetchedAt` time', function () {
			expect(result.fetchedAt).to.be.at.least(originalState.fetchedAt + 1)
		})
	})

	describe('@REMOVE_TERM_FROM_VOCABULARY', function () {
		const index = Math.floor(Math.random() * originalState.data.length)
		const action = {
			type: REMOVE_TERM_FROM_VOCABULARY,
			index,
		}

		const result = termsReducer(originalState, action)

		it('removes a term from the `data` array by index', function () {
			expect(result.data.length).to.be.lessThan(originalState.data.length)
			expect(originalState.data.length - result.data.length).to.equal(1)
		})
	})
})
