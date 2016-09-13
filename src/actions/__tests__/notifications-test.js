import { expect } from 'chai'
import * as actionCreators from '../notifications'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
	CLEAR_ALL_NOTIFICATIONS,
	CLEAR_NOTIFICATION,
	CLEAR_STALE_NOTIFICATIONS,
} from '../../constants'

const mockStore = configureMockStore([thunk])
const store = mockStore([])

describe('Notifications actionCreator', function () {
	afterEach(function () {
		store.clearActions()
	})

	describe('#clearAllNotificaions', function () {
		it('dispatches CLEAR_ALL_NOTIFICATIONS type', function () {
			store.dispatch(actionCreators.clearAllNotifications())
			
			const actions = store.getActions()

			expect(actions).to.have.length(1)
			expect(actions[0].type).to.equal(CLEAR_ALL_NOTIFICATIONS)
		})
	})

	describe('#clearNotification', function () {
		it('dispatches CLEAR_NOTIFICATION type + index', function () {
			const idx = 0
			store.dispatch(actionCreators.clearNotification(idx))
			const actions = store.getActions()

			expect(actions).to.have.length(1)
			expect(actions[0].type).to.equal(CLEAR_NOTIFICATION)
			expect(actions[0]).to.have.property('index')
			expect(actions[0].index).to.equal(idx)
		})

		it('does not dispatch if no index is passed', function () {
			store.dispatch(actionCreators.clearNotification())
			const actions = store.getActions()
			expect(actions).to.be.empty
		})
	})

	describe('#clearStaleNotifications', function () {
		it('dispatches CLEAR_STALE_NOTIFICATION type + time limit', function () {
			const limit = Date.now() - (1000 * 5 * 60)
			store.dispatch(actionCreators.clearStaleNotifications(limit))
			const actions = store.getActions()

			expect(actions).to.have.length(1)
			expect(actions[0].type).to.equal(CLEAR_STALE_NOTIFICATIONS)
			expect(actions[0].limit).to.equal(limit)
		})

		it('defaults to Infinity when no limit is passed', function () {
			store.dispatch(actionCreators.clearStaleNotifications())
			const actions = store.getActions()

			expect(actions).to.have.length(1)
			expect(actions[0].type).to.equal(CLEAR_STALE_NOTIFICATIONS)
			expect(actions[0].limit).to.equal(Infinity)
		})
	})
})
