import { expect } from 'chai'
import workReducer from '../work'
import assign from 'object-assign'

import {
	ADD_EMPTY_VALUE_TO_WORK,
	FETCHING_WORK,
	RECEIVE_WORK,
	REMOVE_VALUE_FROM_WORK,
} from '../../actions/constants'

const originalState = {
	data: {
		title: ['One Title'],
		author: ['Author Name'],
	},
	updates: {},
	fetchedAt: Date.now(),
	isChanged: false,
	isFetching: false,
	isSaving: false,
}

const originalStatePure = assign({}, originalState)

describe('workReducer', function () {
	afterEach(function () {
		expect(originalState).to.deep.equal(originalStatePure)
	})

	it('returns an empty object when state is undefined', function () {
		const result = workReducer()
		expect(result).to.deep.equal({})
	})

	describe('@ADD_EMPTY_VALUE_TO_WORK', function () {
		it('appends an empty value to a non-existing `updates` field', function () {
			const key = 'author'

			const action = {
				type: ADD_EMPTY_VALUE_TO_WORK,
				key,
			}

			expect(typeof originalState.updates[key]).to.equal('undefined')

			const result = workReducer(originalState, action)

			const origData = originalState.data[key]
			const origUpdates = originalState.updates[key]
			const resData = result.data[key]
			const resUpdates = result.updates[key]

			// updates now has the field
			expect(typeof result.updates[key]).to.not.equal('undefined')

			// updates has one more field
			expect(resUpdates).to.have.length(origData.length + 1)

			// `data` stayed the same
			expect(resData).to.deep.equal(origData)
		})

		it('appends an empty value to a pre-existing `updates` field', function () {
			const key = 'title'
			const action = {
				type: ADD_EMPTY_VALUE_TO_WORK,
				key,
			}

			const state = assign({}, originalState, {
				isChanged: true,
				updates: {
					title: ['New Title']
				}
			})

			const result = workReducer(state, action)

			const origData = state.data[key]
			const origUpdates = state.updates[key]

			const resData = result.data[key]
			const resUpdates = result.updates[key]

			// `data` stays the same
			expect(resData).to.deep.equal(origData)

			// `updates.title` gains '' entry
			expect(resUpdates).to.have.length(origUpdates.length + 1)

			const last = [].concat(resUpdates).pop()
			expect(last).to.equal('')
		})
	})

	describe('@FETCHING_WORK', function () {
		it('toggles `isFetching`', function () {
			const action = {type: FETCHING_WORK}
			const result = workReducer(originalState, action)
			
			expect(result).to.deep.equal({
				isFetching: true,
			})
		})
	})

	describe('@RECEIVE_WORK', function () {
		const action = {
			type: RECEIVE_WORK,
			data: {
				title: ['New Work'],
				author: ['New Author'],
			}
		}
		
		const result = workReducer(originalState, action)

		it('data differs from the originalState', function () {
			expect(result.data).to.not.deep.equal(originalState.data)
		})

		it('updates the `fetchedAt` property', function () {
			expect(result.fetchedAt).to.be.at.least(originalState.fetchedAt)
		})
	})

	describe('@REMOVE_VALUE_FROM_WORK', function () {
		const key = 'title'

		const actionCreator = (_key, index) => {
			if (typeof index === 'undefined') {
				index = _key
				_key = key
			}

			return {
				type: REMOVE_VALUE_FROM_WORK,
				index,
				key: _key,
			}
		}

		it('removes the value from the provided key', function () {
			const len = originalState.data[key].length
			const index = len - 1

			const result = workReducer(originalState, actionCreator(index))

			expect(typeof result.updates[key]).to.not.be.undefined
			expect(result.updates[key].length).to.equal(len - 1)
		})

		it('does not toggle `isChanged` if removed field is blank', function () {
			const state = assign({}, originalState)
			const keey = 'blah'

			state.data[keey] = ['']

			expect(state.isChanged).to.be.false

			const result = workReducer(state, actionCreator(keey, 0))

			expect(result.isChanged).to.be.false
		})

		it('toggles `isChanged` if removed field is not blank', function () {
			const origLen = originalState.data[key].length
			const result = workReducer(originalState, actionCreator(0))

			expect(result.updates[key]).to.have.length(origLen - 1)
		})

		it('adds field to `updates` if not there previously', function () {
			const keey = 'author'
			const origLen = originalState.data[keey].length

			expect(originalState.updates[keey]).to.be.undefined

			const result = workReducer(originalState, actionCreator(keey, 0))

			expect(result.updates[keey]).to.not.be.undefined
			expect(result.updates[keey]).to.have.length(origLen - 1)
		})
	})
})
