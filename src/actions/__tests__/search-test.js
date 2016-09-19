import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import { searchCatalog } from '../search'

import {
	RECEIVE_SEARCH_RESULTS,
	SEARCHING,
} from '../../constants'

const mockStore = configureMockStore([thunk])
const API_BASE = process.env.API_BASE_URL

const query = {
	q: 'cats AND dogs',
	facets: {
		collection: [
			'fake collection'
		],
		format: [
			'book', 'dvd',
		]
	}
}

describe('Search actionCreator', function () {
	beforeEach(function () {
		if (!API_BASE)
			this.skip()		
	})

	describe('#searchCatalog', function () {
		const store = mockStore({})

		beforeEach(function () {
			const escaped = API_BASE.replace(/\./g, '\\.')
			const reg = new RegExp(escaped + '/catalog\\.json?.*')
			fetchMock.get(reg, {status: 200, body: {response: {}}})
		})

		afterEach(function () {
			fetchMock.restore()
			store.clearActions()
		})

		it('dispatches `SEARCHING` and `RECEIVE_SEARCH_RESULTS`', function () {
			return store.dispatch(searchCatalog(query.q))
			.then(() => {
				const actions = store.getActions()
				expect(actions).to.have.length(2)
				expect(actions[0].type).to.equal(SEARCHING)
				expect(actions[1].type).to.equal(RECEIVE_SEARCH_RESULTS)
			})
		})

		it('dispatches `SEARCHING` w/ query details', function () {
			const query = 'cats AND dogs'
			const facets = { one: ['a', 'b']}
			const options = { per_page: 5 }

			return store.dispatch(searchCatalog(query, facets, options))
			.then(() => {
				const actions = store.getActions()
				expect(actions).to.have.length(2)
				expect(actions[0].type).to.equal(SEARCHING)
				expect(actions[0].query).to.equal(query)
				expect(actions[0].facets).to.deep.equal(facets)
				expect(actions[0].options.per_page).to.equal(options.per_page)
			})
		})

		it('appends `format=json` and `search_field=search` to url', function () {
			return store.dispatch(searchCatalog(query.q, query.facets))
			.then(() => {
				const url = fetchMock.lastUrl()
				expect(url.indexOf('format=json')).to.be.greaterThan(-1)
				expect(url.indexOf('search_field=search')).to.be.greaterThan(-1)
			})
		})

		it('prepends unescaped `utf8=✓` to the querystring', function () {
			return store.dispatch(searchCatalog(query.q))
			.then(() => {
				const url = fetchMock.lastUrl()
				expect(url.indexOf('utf8=✓')).to.be.greaterThan(-1)
			})
		})
	})
})
