import { expect } from 'chai'
import * as actions from '../work'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

const mockStore = configureMockStore([thunk])

import {
	// ADD_EMPTY_VALUE_TO_WORK,
	FETCHING_WORK,
	RECEIVE_WORK,
	// REMOVE_VALUE_FROM_WORK,
	// UPDATE_WORK,
} from '../../constants'

describe('Work actionCreator', function () {
	afterEach(() => {
		nock.cleanAll()
	})

	it('fetches', function () {
		nock('http://concerns.stage.lafayette.edu')
			.get('/concerns/generic_work/g732d898n.json')
			.reply(200, { body: {
				title: ['HULLO!']
			}})

		const expectedActions = [
			{type: FETCHING_WORK},
			{type: RECEIVE_WORK, data: {title: ['HULLO!']}}
		]

		const store = mockStore({work: {}})

		store.dispatch(actions.fetchWork('g732d898n'))
			.then(() => {
				expect(store.getActions()).to.deep.equal(expectedActions)
			})
	})
})

// describe('Work actionCreators', function () {
// 	describe('#addEmptyValueToWork', function () {
// 		it('returns the ADD_EMPTY_VALUE_TO_WORK action + key passed', function () {
// 			const testKey = 'testKey'
// 			const data = getActionData('addEmptyValueToWork', testKey)

// 			expect(data).to.deep.equal({
// 				type: ADD_EMPTY_VALUE_TO_WORK,
// 				key: testKey
// 			})
// 		})
// 	})

// 	describe('#editWorkField', function () {
// 		it('returns the UPDATE_WORK action + key/index/value passed', function () {
// 			const key = 'key'
// 			const index = 0
// 			const value = 'value'

// 			const data = getActionData('editWorkField', key, index, value)

// 			expect(data).to.deep.equal({
// 				type: UPDATE_WORK,
// 				key,
// 				index,
// 				value,
// 			})
// 		})
// 	})

// 	describe('#fetchWork', function () {
// 		xit('retrieves the corresponding work from the server')
// 	})

// 	describe('#removeValueFromWork', function () {
// 		it('returns the REMOVE_VALUE_FROM_WORK action + key/index passed', function () {
// 			const key = 'key'
// 			const index = 0

// 			const data = getActionData('removeValueFromWork', key, index)

// 			expect(data).to.deep.equal({
// 				type: REMOVE_VALUE_FROM_WORK,
// 				key,
// 				index,
// 			})
// 		})
// 	})

// 	describe('#saveWork', function () {
// 		xit('updates the work to the API server')
// 	})
// })
