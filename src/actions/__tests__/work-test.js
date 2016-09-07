import { expect } from 'chai'
import * as actions from '../work'

import {
	ADD_EMPTY_VALUE_TO_WORK,
	REMOVE_VALUE_FROM_WORK,
	UPDATE_WORK,
} from '../../constants'

const getActionData = function () {
	const args = Array.prototype.slice.call(arguments)
	const name = args.shift()

	const func = actions[name]
	const dispatch = func.apply(null, args)

	return dispatch(function (t) { return t })
}

describe('Work actionCreators', function () {
	describe('#addEmptyValueToWork', function () {
		it('returns the ADD_EMPTY_VALUE_TO_WORK action + key passed', function () {
			const testKey = 'testKey'
			const data = getActionData('addEmptyValueToWork', testKey)

			expect(data).to.deep.equal({
				type: ADD_EMPTY_VALUE_TO_WORK,
				key: testKey
			})
		})
	})

	describe('#editWorkField', function () {
		it('returns the UPDATE_WORK action + key/index/value passed', function () {
			const key = 'key'
			const index = 0
			const value = 'value'

			const data = getActionData('editWorkField', key, index, value)

			expect(data).to.deep.equal({
				type: UPDATE_WORK,
				key,
				index,
				value,
			})
		})
	})

	describe('#fetchWork', function () {
		xit('retrieves the corresponding work from the server')
	})

	describe('#removeValueFromWork', function () {
		it('returns the REMOVE_VALUE_FROM_WORK action + key/index passed', function () {
			const key = 'key'
			const index = 0

			const data = getActionData('removeValueFromWork', key, index)

			expect(data).to.deep.equal({
				type: REMOVE_VALUE_FROM_WORK,
				key,
				index,
			})
		})
	})

	describe('#saveWork', function () {
		xit('updates the work to the API server')
	})
})
