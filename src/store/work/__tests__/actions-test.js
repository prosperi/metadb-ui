import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from '../work/actions'

const mockStore = configureMockStore([thunk])

const apiWorkUrl = id => (
	`${process.env.API_BASE_URL}/concern/generic_works/${id}.json`
)

const NOT_FOUND_ID = 'fake-id'

describe('Work actions', function () {
	describe('#fetchWork', function () {
		const id = 'example-id'

		before(function () {
			if (!process.env.API_BASE_URL) {
				this.skip()
				return
			}

			fetchMock
				.get(apiWorkUrl(id), { title: ['HULLO!'] })
				.get(apiWorkUrl(NOT_FOUND_ID), 404)
				.get('*', 500)
		})

		after(fetchMock.restore)

		it('sends `fetchingWork` and `receiveWork` actions', function () {
			const expectedActions = [
				actions.fetchingWork({id}),
				actions.receiveWork({data: {title: ['HULLO!']}}),
			]

			const store = mockStore({work: {}})

			return store.dispatch(actions.fetchWork(id))
				.then(() => {
					expect(store.getActions()).to.deep.equal(expectedActions)
				})
		})

		it('sends `fetchingWork` and `workNotFoundErr` if not found', function () {
			const id = NOT_FOUND_ID
			const store = mockStore({work: {}})

			return store.dispatch(actions.fetchWork(id))
				.then(() => {
					const axns = store.getActions()
					expect(axns[0].type).to.equal(actions.fetchingWork.toString())
					expect(axns[0].payload.id).to.equal(id)
					expect(axns[1].type).to.equal(actions.workNotFoundErr.toString())
					expect(axns[1].payload.status).to.equal(404)
				})
		})

		it('sends `fetchingWork` and `fetchingWorkErr` if encountering an error', function () {
			const id = 'whatever'
			const store = mockStore({work: {}})

			return store.dispatch(actions.fetchWork(id))
				.then(() => {
					const axns = store.getActions()
					expect(axns[0].type).to.equal(actions.fetchingWork.toString())
					expect(axns[1].payload.id).to.equal(id)
					expect(axns[1].type).to.equal(actions.fetchingWorkErr.toString())
				})
		})
	})

	describe('#saveWork', function () {
		const id = 'example-work'

		before(function () {
			if (!process.env.API_BASE_URL) {
				this.skip()
				return
			}

			fetchMock.mock({
				matcher: apiWorkUrl(id),
				method: 'PATCH',
				response: {
					status: 200,
					body: {
						status: 'ok'
					}
				}
			})
		})

		after(fetchMock.restore)

		it('dispatches `savingWork` and `savedWork` when successful', function () {
			const state = {
				work: {
					data: {
						title: ['Old Title'],
					}
				}
			}

			const updates = {
				title: ['New Title']
			}

			const expectedActions = [
				actions.savingWork({id, updates}),
				actions.savedWork({id, updates}),
			]

			const store = mockStore(state)

			return store.dispatch(actions.saveWork(id, updates))
				.then(() => {
					const axns = store.getActions()
					expect(axns).to.have.length(expectedActions.length)

					expectedActions.forEach((exAction, idx) => {
						expect(exAction.type).to.equal(axns[idx].type)
						expect(exAction.payload).to.deep.equal(axns[idx].payload)
					})
				})
		})
	})
})
