import { expect } from 'chai'
import vocabReducer from '../vocabularies'
import * as originalState from './mocks/vocabularies.json'
import assign from 'object-assign'

import {
	ADD_TERM_TO_VOCABULARY,
	BULK_EDIT_TERMS,
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

	describe('@BULK_EDIT_TERMS', function () {
		it('updates the `term_count` property to new count', function () {
			const originalData = originalState.data
			const idx = Math.floor(Math.random() * originalData.length)
			const vocab = originalData[idx]
			const originalCount = vocab.term_count

			const rando = () => Math.floor(Math.random() * 10)

			let newCount = rando()

			// reset if we're at the same number
			while (newCount === originalCount)
				newCount = Math.floor(Math.random() * 10)

			const updates = []

			for (let i = 0; i <= newCount; i++) {
				updates.push({
					uri: 'http://lol.club/' + i,
					pref_label: ['Term ' + i],
				})
			}

			const action = {
				type: BULK_EDIT_TERMS,
				data: updates,
				vocabulary: vocab,
			}

			const result = vocabReducer(originalState, action)
			const newData = result.data[idx]

			expect(newData.term_count).to.not.equal(originalData.term_count)
			expect(newData.term_count).to.equal(action.data.length)
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
