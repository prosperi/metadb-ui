import { expect } from 'chai'
import vocabReducer from '../vocabularies'
import * as originalState from './mocks/vocabularies.json'
import assign from 'object-assign'

import {
	ADD_TERM_TO_VOCABULARY,
	FETCHING_ALL_VOCABULARIES,
	REMOVE_TERM_FROM_VOCABULARY,
} from '../../actions/constants'

const originalStatePure = assign({}, originalState)

describe('vocabularyReducer', function () {
	afterEach(function () {
		expect(originalState).to.deep.equal(originalStatePure)
	})

	it('returns an empty object when state is undefined', function () {
		const result = vocabReducer()

		expect(result).to.be.empty
		expect(result).to.deep.equal({})
	})

	describe('@ADD_TERM_TO_VOCABULARY', function () {
		it('increments the `term_count` property', function () {
			const originalData = originalState.data
			const idx = Math.floor(Math.random() * originalData.length)

			const originalVocab = originalData[idx]
			const uri = originalVocab.uri

			const action = {
				type: ADD_TERM_TO_VOCABULARY,
				term: 'whatever',
				uri,
			}

			const result = vocabReducer(originalState, action)
			const updatedVocab = result.data[idx]

			expect(updatedVocab.term_count).to.be.greaterThan(originalVocab.term_count)
			expect(updatedVocab.term_count - originalVocab.term_count).to.equal(1)
		})
	})

	describe('@FETCHING_ALL_VOCABULARIES', function () {
		it('sets the `isFetching` flag to true', function () {
			const action = {type: FETCHING_ALL_VOCABULARIES}
			const result = vocabReducer(originalState, action)

			expect(result.isFetching).to.be.true
		})
	})

	describe('@REMOVE_TERM_FROM_VOCABULARY', function () {
		it('decrements the `term_count` property', function () {
			const originalData = originalState.data
			const idx = Math.floor(Math.random() * originalData.length)

			const originalVocab = originalData[idx]
			const uri = originalVocab.uri

			const action = {
				type: REMOVE_TERM_FROM_VOCABULARY,
				term: 'whatever',
				uri,
			}

			const result = vocabReducer(originalState, action)
			const updatedVocab = result.data[idx]

			expect(updatedVocab.term_count).to.be.lessThan(originalVocab.term_count)
			expect(originalVocab.term_count - updatedVocab.term_count).to.equal(1)
		})
	})
})
