import { expect } from 'chai'
import { addSearch, getSearches } from '../search-history'

describe('lib/search-history', function () {
	// need to run this _before_ each test so as to clear out previous searches
	// saved from `search` action tests
	beforeEach(function () {
		localStorage.clear()
	})

	describe('#addSearch', function () {
		it('writes a search object to localStorage', function () {
			const search = {
				query: 'cats',
				facets: {},
				options: {},
			}

			addSearch(search)
			expect(getSearches()).to.deep.equal([search])
		})

		it('puts most recent search at beginning of array', function () {
			const first = {
				query: 'cats 1',
				facets: {},
				options: {},
			}

			const second = {
				query: 'cats 2',
				facets: {},
				options: {},
			}

			addSearch(first)
			addSearch(second)

			expect(getSearches()).to.deep.equal([second, first])
		})
	})
})
