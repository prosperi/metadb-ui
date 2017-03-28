import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from '../actions'

const mockStore = configureMockStore([thunk])
const apiUrl = `${process.env.API_BASE_URL}/batch_edits.json`

const storeWithoutRange = {
	search: {
		facets: {
			subject_ocm: [{value: '530 ARTS'}]
		},
		query: 'Cool Cats',
		options: {},
		results: {
			pages: {
				total_count: 10,
			}
		}
	}
}

const storeWithRanges = {
	search: {
		facets: {
			subject_ocm: [{value: '530 ARTS'}],
			date_artifact_upper: [{
				type: 'range',
				value: {
					begin: '1986-02-11',
					end: '2017-02-16',
				}
			}]
		},
		query: 'Cool Cats',
		options: {},
		results: {
			pages: {
				total_count: 6,
			}
		}
	}
}

const updates = {
	creator: ['Top Cat'],
}

describe('Batch actionCreator', function () {
	beforeEach(function () {
		if (!process.env.API_BASE_URL) {
			this.skip()
		}
	})

	describe('a successful update', function () {
		beforeEach(function () {
			fetchMock.mock({
				matcher: apiUrl,
				method: 'PUT',
				response: {
					body: {
						status: 'ok'
					}
				}
			})
		})

		afterEach(fetchMock.restore)

		it('sends `batchUpdatingWorks` + `batchUpdatedWorks`', function () {
			const store = mockStore(storeWithoutRange)
			return store.dispatch(actions.batchUpdateWorks(updates)).then(() => {
				const axns = store.getActions()
				expect(axns[0].type).to.equal(actions.batchUpdatingWorks.toString())
				expect(axns[1].type).to.equal(actions.batchUpdatedWorks.toString())
			})
		})

		it('passes the `count` value to pending + successful actions', function () {
			const store = mockStore(storeWithoutRange)
			return store.dispatch(actions.batchUpdateWorks(updates)).then(() => {
				const axns = store.getActions()
				axns.forEach(action => {
					const { payload } = action
					const total = storeWithoutRange.search.results.pages.total_count
					expect(payload).to.have.property('count')
					expect(payload.count).to.equal(total)
				})
			})
		})

		it('parses out range facets when included', function () {
			const store = mockStore(storeWithRanges)
			return store.dispatch(actions.batchUpdateWorks(updates)).then(() => {
				const lastArgs = fetchMock.lastCall()
				let [ , { body } ] = lastArgs

				if (typeof body === 'string') {
					body = JSON.parse(body)
				}

				expect(body).to.have.property('search')
				expect(body.search).to.have.property('range')
				expect(Object.keys(body.search.range)).to.have.length
			})
		})
	})

	describe('an error-inducing request', function () {
		beforeEach(function () {
			fetchMock.mock({
				matcher: apiUrl,
				method: 'PUT',
				response: {
					status: 500,
					statusText: 'Internal Server Error',
				}
			})
		})

		afterEach(fetchMock.restore)

		it('dispatches `batchUpdatingWorks` + `batchUpdatingWorksErr`', function () {
			const store = mockStore(storeWithoutRange)
			return store.dispatch(actions.batchUpdateWorks(updates)).then(() => {
				const axns = store.getActions()
				expect(axns[0].type).to.equal(actions.batchUpdatingWorks.toString())
				expect(axns[1].type).to.equal(actions.batchUpdatingWorksErr.toString())
			})
		})
	})
})
