import { expect } from 'chai'
import randomIndex from 'random-array-index'

import termsReducer from '../reducer'
import * as actions from '../actions'
import { createNewTerm } from '../utils'
import originalState from './data/active-terms.json'

const originalStatePure = { ...originalState }

describe('activeVocabularyTermsReducer', function () {
	afterEach(function () {
		expect(originalState).to.deep.equal(originalStatePure)
	})

	it('returns an empty object when state is undefined', function () {
		const result = termsReducer(undefined, { type: 'nothing' })

		expect(result).to.be.empty
		expect(result).to.deep.equal({})
	})

	describe('`addedTermToVocabulary`', function () {
		it('appends newly-created term to the `data` object', function () {
			const term = 'whaaaa?'
			const vocabulary = {
				uri: originalState.vocabularyUri
			}

			const data = createNewTerm(term, vocabulary)
			const action = actions.addedTermToVocabulary({
				term: data,
				vocabulary,
			})

			const result = termsReducer(originalState, action)

			expect(result.data.length).to.be.greaterThan(originalState.data.length)
			expect(result.data.length - originalState.data.length).to.equal(1)

			expect(result.data[result.data.length - 1]).to.deep.equal(data)
		})
	})

	describe('`bulkEditedTerms`', function () {
		const prev = [
			{uri: 'https://example.com/vocab/test1', pref_label: ['test1']},
			{uri: 'https://example.com/vocab/test2', pref_label: ['test2']},
		]

		const update = [
			{uri: 'https://example.com/vocab/test1', pref_label: ['new test1']},
			{uri: 'https://example.com/vocab/test2', pref_label: ['test2']},
			{uri: 'https://example.com/vocab/test3', pref_label: ['test3']},
		]

		const action = actions.bulkEditedTerms({
			terms: update,
			vocabulary: {
				uri: 'https://example.com/vocab',
				label: ['Test Vocab'],
				pref_label: ['Test Vocab'],
			},
		})

		const state = { ...originalState }
		state.data = prev
		state.vocabularyUri = action.payload.vocabulary.uri

		const result = termsReducer(state, action)

		it('replaces the previous state with new terms objects', function () {
			expect(result.data).to.not.deep.equal(state.data)
			expect(result.data).to.deep.equal(update)
		})


	})

	describe('`fetchedVocabularyTerms`', function () {
		const action = actions.fetchedVocabularyTerms({
			terms: [
				{uri: 'http://whatever.org'},
				{uri: 'http://whatever.org'},
			],
			vocabulary: {
				uri: originalState.vocabularyUri,
			},
		})

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

	describe('`fetchingVocabularyTerms`', function () {
		const action = actions.fetchingVocabularyTerms({
			vocabulary: {
				uri:'http://example.org',
			}
		})

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

	describe('`removedTermFromVocabulary`', function () {
		const index = randomIndex(originalState.data)
		const action = actions.removedTermFromVocabulary({
			index,
			vocabulary: {
				uri: originalState.vocabularyUri,
			},
		})

		const result = termsReducer(originalState, action)

		it('removes a term from the `data` array by index', function () {
			expect(result.data.length).to.be.lessThan(originalState.data.length)
			expect(originalState.data.length - result.data.length).to.equal(1)
		})
	})

	describe('`updatedTermInVocabulary`', function () {
		it('changes a term to the update passed', function () {
			const index = randomIndex(originalState.data)
			const original = originalState.data[index]
			const copy = { ...original }

			copy.alt_label = [].concat(
				copy.alt_label,
				'Hey here is a new alt_label',
				'and another!'
			)

			const prefLabel = original.pref_label[0]

			const action = actions.updatedTermInVocabulary({
				previousPrefLabel: prefLabel,
				data: copy,
				vocabulary: {
					uri: originalState.vocabularyUri,
				},
			})

			const result = termsReducer(originalState, action)

			expect(result.data).to.have.length(originalState.data.length)
			expect(result.data[index].alt_label).to.not.deep.equal(originalState.data[index].alt_label)
		})

		it('updates the correct term when pref_label is changed', function () {
			const index = randomIndex(originalState.data)
			const original = originalState.data[index]
			const copy = { ...original }
			const newLabel = 'Hey I am a new label!'

			copy.label = [].concat(
				copy.label,
				newLabel
			)

			copy.pref_label = [newLabel]

			const prefLabel = original.pref_label[0]

			const action = actions.updatedTermInVocabulary({
				previousPrefLabel: prefLabel,
				data: copy,
				vocabulary: {
					uri: originalState.vocabularyUri,
				},
			})

			const result = termsReducer(originalState, action)

			expect(result.data).to.have.length(originalState.data.length)
			expect(result.data[index].pref_label)
				.to.not.deep.equal(originalState.data[index].pref_label)
		})
	})
})
