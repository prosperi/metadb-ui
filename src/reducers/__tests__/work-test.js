import { expect } from 'chai'
import workReducer from '../work'
import assign from 'object-assign'

import {
	ADD_EMPTY_VALUE_TO_WORK,
	FETCHING_WORK,
	RECEIVE_WORK,
	REMOVE_VALUE_FROM_WORK,
	SAVED_WORK,
	SAVING_WORK,
	UPDATE_WORK,
} from '../../constants'

const originalState = {
	data: {
		title: ['One Title', 'Two Titles'],
		author: ['Author Name', 'Another author'],
		single_value: ['just one here'],
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
			const resData = result.data[key]
			const resUpdates = result.updates[key]

			// updates now has the field
			expect(typeof result.updates[key]).to.not.equal('undefined')

			// updates has one more field than the original data field
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

		it('adds an empty string if the last value was removed', function () {
			const keey = 'single_value'
			expect(originalState.updates[keey]).to.be.undefined

			const result = workReducer(originalState, actionCreator(keey, 0))
			expect(result.updates[keey]).to.not.be.undefined
			expect(result.updates[keey]).to.have.length(1)
			expect(result.updates[keey][0]).to.equal('')
		})
	})

	describe('@SAVED_WORK', function () {
		const action = {type: SAVED_WORK}

		let data, updates, state

		beforeEach(function () {
			data = {
				title: ['First Title'],
				author: []
			}

			updates = {
				title: ['First Title', 'Another Author'],
				author: ['The Author']
			}

			state = {
				data,
				updates,
				isChanged: true,
			}
		})

		it('merges data with updates', function () {
			const result = workReducer(state, action)

			expect(result.data.title).to.deep.equal(updates.title)
			expect(result.data.author).to.deep.equal(updates.author)
		})

		it('empties the changes object', function () {
			const result = workReducer(state, action)
			expect(result.updates).to.be.empty
		})

		it('toggles `isChanged` to false', function () {
			const result = workReducer(state, action)
			expect(result.isChanged).to.be.false
		})

		it('toggles `isSaving` to false', function () {
			const result = workReducer(state, action)
			expect(result.isSaving).to.be.false
		})
	})

	describe('@SAVE_WORK', function () {
		const action = {type: SAVING_WORK}

		let state, result

		beforeEach(function () {
			state = assign({}, originalState, {
				updates: {
					title: [].concat(originalState.data.title, 'New Title')
				},
				isChanged: true,
			})

			result = workReducer(state, action)
		})

		it('retains current state (except `isSaving` flag)', function () {
			for (let key in result) {
				if (key === 'isSaving')
					continue

				expect(result[key]).to.deep.equal(state[key])
			}
		})

		it('toggles `isSaving` flag to true', function () {
			expect(result.isSaving).to.be.true
		})
	})

	describe('@UPDATE_WORK', function () {
		const action = {
			type: UPDATE_WORK,
			key: 'title',
			index: originalState.data.title.length - 1,
			value: 'New Value for Title',
		}

		it('stores changes in the `updates` object', function () {
			expect(originalState.updates).to.be.empty

			const result = workReducer(originalState, action)

			expect(result.updates).to.not.be.empty
		})

		it('adds field to `updates` if not present', function () {
			const key = 'meow'
			const state = assign({}, originalState)

			state.data[key] = []

			const addFieldAction = {
				type: UPDATE_WORK,
				key,
				index: 0,
				value: `new ${key}`,
			}

			const result = workReducer(state, addFieldAction)

			expect(originalState.updates[key]).to.be.undefined
			expect(result.updates[key]).to.not.be.undefined
		})

		it('toggles `isChanged` flag if previously unset', function () {
			expect(originalState.isChanged).to.be.false

			const result = workReducer(originalState, action)
			expect(result.isChanged).to.be.true
		})

		it('leaves `isChanged` flagged as true if already set', function () {
			const result = workReducer(originalState, action)

			expect(result.isChanged).to.be.true

			const newAction = assign({}, action, {index: result.updates.title.length - 1})
			const result2 = workReducer(result, newAction)

			expect(result2.isChanged).to.be.true
		})
	})
})
