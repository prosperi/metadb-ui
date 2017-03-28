import { expect } from 'chai'

import * as actions from '../actions'
import searchReducer from '../reducer'

const defaultState = {
	query: '',
	facets: {},
	options: {},
	isSearching: false,
	queryString: '',
}

const defaultStatePure = { ...defaultState }

describe('Search reducer', function () {
	afterEach(function () {
		expect(defaultState).to.deep.equal(defaultStatePure)
	})

	it('returns an empty object when state is undefined', function () {
		const res = searchReducer(undefined, {type: 'nothing'})

		expect(res).to.be.an('object')
		expect(res).to.be.empty
	})

	describe('`fetchingSearch`', function () {
		it('sets `isSearching` to true', function () {
			const action = actions.fetchingSearch({
				query: 'some query',
				facets: {},
				options: {},
				queryString: 'q=some+query'
			})

			const res = searchReducer(defaultState, action)

			expect(res.isSearching).to.be.true
		})

		it('updates the `query`, `facets`, and `options` to those passed', function () {
			const query = 'a whole new query'
			const facets = { 'one': ['a','b'] }
			const options = { 'per_page': 25 }
			const queryString = '?q=a%20whole%20new%20query&f[one][]=a&f[one][]=b&per_page=25'

			const action = actions.fetchingSearch({
				query,
				facets,
				options,
				queryString,
			})

			const res = searchReducer(defaultState, action)

			expect(res.query).to.not.equal(defaultState.query)
			expect(res.query).to.equal(query)

			expect(res.facets).to.not.deep.equal(defaultState.facets)
			expect(res.facets).to.deep.equal(facets)

			expect(res.options).to.not.deep.equal(defaultState.options)
			expect(res.options).to.deep.equal(options)

			expect(res.queryString).to.not.deep.equal(defaultState.queryString)
			expect(res.queryString).to.equal(queryString)
		})
	})

	describe('`fetchingSearchErr`', function () {
		it('sets `isSearching` to false', function () {
			const action = actions.fetchingSearchErr()
			const res = searchReducer({isSearching: true}, action)

			expect(res.isSearching).to.be.false
		})
	})

	describe('`receivedSearchResults`', function () {
		it('sets `isSearching` to false', function () {
			const action = actions.receivedSearchResults({
				results: {
					response: {},
				}
			})

			const res = searchReducer({isSearching: true}, action)

			expect(res.isSearching).to.be.false
		})
	})
})
