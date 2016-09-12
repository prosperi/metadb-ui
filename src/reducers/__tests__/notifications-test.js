import { expect } from 'chai'
import notificationsReducer from '../notifications'

import {
	CLEAR_ALL_NOTIFICATIONS,
	CLEAR_NOTIFICATION,
	CLEAR_STALE_NOTIFICATIONS,
} from '../../constants'

const STALE_LIMIT = (1000 * 5 * 60)

const originalState = [
	{type: 'SUCCESS', message: 'Hey that one worked!', time: Date.now() - STALE_LIMIT},
	{type: 'ERROR', message: 'But this one did not!', time: Date.now()}
]

const originalStatePure = [].concat(originalState)

describe('Notifications reducer', function () {
	beforeEach(function () {
		expect(originalState).to.deep.equal(originalStatePure)
	})

	it('returns an empty array when state is undefined', function () {
		const result = notificationsReducer()
		expect(result).to.be.an('array')
		expect(result).to.be.empty
	})

	describe('@CLEAR_ALL_NOTIFICATIONS', function () {
		it('clears out the state completely', function () {
			const startState = [{message: 'hi'}, {message: 'another'}]

			const action = {type: CLEAR_ALL_NOTIFICATIONS}
			const result = notificationsReducer(startState, action)

			expect(result).to.be.empty
		})
	})

	describe('@CLEAR_NOTIFICATION', function () {
		it('removes a notification by its index', function () {
			const action = {type: CLEAR_NOTIFICATION, index: 0}
			const result = notificationsReducer(originalState, action)

			expect(result.length).to.be.lessThan(originalState.length)
			expect(originalState.length - result.length).to.equal(1)
		})
	})

	describe('@CLEAR_STALE_NOTIFICATIONS', function () {
		it('clears notifications older than `action.limit`', function () {
			const action = {
				type: CLEAR_STALE_NOTIFICATIONS,
				limit: STALE_LIMIT,
			}

			const result = notificationsReducer(originalState, action)

			expect(result.length).to.be.lessThan(originalState.length)
		})
	})
})
