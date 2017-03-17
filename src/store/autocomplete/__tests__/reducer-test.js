import { expect } from 'chai'
import autocompleteReducer from '../reducer'
import { receiveVocabularyTerms } from '../actions'

const originalState = {}

describe('autocomplete-terms reducer', function () {
	afterEach(function () {
		expect(originalState).to.be.empty
	})

	it('returns an empty object w/o previous state', function () {
		const result = autocompleteReducer(undefined, {type: 'nothing'})

		expect(result).to.be.an('object')
		expect(result).to.be.empty
	})

	describe('term storage', function () {
		it('uses vocab uri to determine terms key', function () {
			const uri = 'http://example.org'
			const action = receiveVocabularyTerms({
				terms: [
					'aye', 'bee', 'cee', 'dee'
				],
				vocabulary: {
					uri,
					label: ['Test Vocab'],
					pref_label: ['Test Vocab'],
				}
			})

			const result = autocompleteReducer(originalState, action)

			expect(uri in result).to.be.true
		})
	})
})
