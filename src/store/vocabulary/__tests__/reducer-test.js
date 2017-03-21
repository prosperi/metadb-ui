import { expect } from 'chai'
import * as originalState from './data/vocabularies.json'
import randomIndex from 'random-array-index'

import * as vocab from '../actions'
import * as terms from '../../active-vocabulary-terms/actions'
import vocabReducer from '../reducer'

const originalStatePure = { ...originalState }

describe('vocabularyReducer', function () {
	afterEach(function () {
		expect(originalState).to.deep.equal(originalStatePure)
	})

	it('returns an empty object when state is undefined', function () {
		const result = vocabReducer(undefined, { type: 'nothing' })

		expect(result.data).to.be.empty
	})

	describe('`addTermToVocabulary`', function () {
		it('increments the `term_count` property', function () {
			const originalData = originalState.data
			const idx = randomIndex(originalData)

			const originalVocab = originalData[idx]

			const action = terms.addedTermToVocabulary({
				term: 'whatever',
				vocabulary: originalVocab,

				// backwards compat
				uri: originalVocab.uri,
			})

			const result = vocabReducer(originalState, action)
			const updatedVocab = result.data[idx]

			expect(updatedVocab.term_count).to.be.greaterThan(originalVocab.term_count)
			expect(updatedVocab.term_count - originalVocab.term_count).to.equal(1)
		})
	})

	describe('`bulkEditedTerms', function () {
		it('updates the `term_count` property to new count', function () {
			const originalData = originalState.data
			const idx = randomIndex(originalData)
			const vocab = originalData[idx]
			const originalCount = vocab.term_count

			let newCount = Math.floor(Math.random() * 10)

			if (newCount === originalCount)
				newCount++

			const updates = []

			for (let i = 0; i <= newCount; i++) {
				updates.push({
					uri: 'http://lol.club/' + i,
					pref_label: ['Term ' + i],
				})
			}

			const action = terms.bulkEditedTerms({
				terms: updates,
				vocabulary: vocab,
			})

			const result = vocabReducer(originalState, action)
			const newData = result.data[idx]

			expect(newData.term_count).to.not.equal(originalData.term_count)
			expect(newData.term_count).to.equal(action.payload.terms.length)
		})
	})

	describe('`createdVocabulary`', function () {
		const action = vocab.createdVocabulary({
			uri: 'http://example.com/ns/newVocabEntry',
			label: ['New Vocab'],
			alt_label: [],
			hidden_label: [],
			pref_label: ['New Vocab'],
		})

		const result = vocabReducer(originalState, action)

		it('appends an empty `term_count` key', function () {
			const copy = [].concat(result.data)
			const target = copy.pop()

			expect(target.uri).to.equal(action.payload.uri)
			expect(target.term_count).to.not.be.undefined
			expect(target.term_count).to.equal(0)
		})

		it('adds vocabulary to state.data', function () {
			const origLen = originalState.data.length
			const resLen = result.data.length

			expect(resLen).to.be.greaterThan(origLen)
			expect(resLen - origLen).to.equal(1)
			expect(result.data[resLen - 1].uri).to.equal(action.payload.uri)
		})
	})

	describe('`deletedVocabulary`', function () {
		const originalData = originalState.data
		const idx = randomIndex(originalData)
		const target = originalData[idx]

		const action = vocab.deletedVocabulary(target)
		const result = vocabReducer(originalState, action)

		it('removes the target vocabulary from the vocab list', function () {
			expect(originalData.length).to.be.greaterThan(result.data.length)
			expect(originalData.length - result.data.length).to.equal(1)
		})
	})

	describe('`fetchingVocabularies`', function () {
		it('sets the `isFetching` flag to true', function () {
			const action = vocab.fetchingVocabularies()
			const result = vocabReducer(originalState, action)

			expect(result.isFetching).to.be.true
		})
	})

	describe('`removedTermFromVocabulary`', function () {
		it('decrements the `term_count` property', function () {
			const originalData = originalState.data
			const idx = 1

			const originalVocab = originalData[idx]

			const action = terms.removedTermFromVocabulary({
				term: 'whatever',
				vocabulary: originalVocab,
			})

			const result = vocabReducer(originalState, action)
			const updatedVocab = result.data[idx]

			expect(updatedVocab.term_count).to.be.lessThan(originalVocab.term_count)
			expect(originalVocab.term_count - updatedVocab.term_count).to.equal(1)
		})
	})

	describe('`updatedVocabulary`', function () {
		const targetUri = 'http://example.org/example'
		const targetUpdate = {
			uri: targetUri,
			pref_label: ['Cool Thing'],
		}

		const originalState = {
			isFetching: false,
			data: [
				{
					uri: 'http://rad.org/#VocabularyOne',
					pref_label: ['Vocabulary One'],
				},
				{
					uri: targetUri,
					pref_label: ['Vocabulary Two'],
				},
				{
					uri: 'http://rad.org/#VocabularyThree',
					pref_label: ['Vocabulary Three']
				}
			]
		}

		const action = vocab.updatedVocabulary(targetUpdate)
		const result = vocabReducer(originalState, action)

		expect(result.data[1].pref_label)
			.to.not.deep.equal(originalState.data[1].pref_label)

		expect(result.data[1].pref_label).to.deep.equal(targetUpdate.pref_label)
	})
})
