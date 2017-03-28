import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions'

const mockStore = configureMockStore([thunk])
const store = mockStore([])

describe('Notifications actionCreator', function () {
	afterEach(function () {
		store.clearActions()
	})

	describe('#clearNotification', function () {
		it('dispatches `clearNotification`', function () {
			const idx = 0
			store.dispatch(actions.clearNotification(idx))
			const axns = store.getActions()

			expect(axns).to.have.length(1)
			expect(axns[0].type).to.equal(actions.clearNotification.toString())
			expect(axns[0].payload).to.equal(idx)
		})
	})
})
