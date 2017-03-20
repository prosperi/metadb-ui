import { expect } from 'chai'
import notificationsReducer from '../reducer'
import * as actions from '../actions'

const originalState = [
	{ type: 'SUCCESS', message: 'Hey that one worked!' },
	{ type: 'ERROR', message: 'But this one did not!' },
]

const originalStatePure = [].concat(originalState)

describe('Notifications reducer', function () {
	beforeEach(function () {
		expect(originalState).to.deep.equal(originalStatePure)
	})

	it('returns an empty array when state is undefined', function () {
		const result = notificationsReducer(undefined, {type: 'nothing'})
		expect(result).to.be.an('array')
		expect(result).to.be.empty
	})

	describe('`clearNotification`', function () {
		it('removes a notification by its index', function () {
			const action = actions.clearNotification(0)
			const result = notificationsReducer(originalState, action)

			expect(result.length).to.be.lessThan(originalState.length)
			expect(originalState.length - result.length).to.equal(1)
		})
	})
})
