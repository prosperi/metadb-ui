import { expect } from 'chai'
import * as actions from '../work/actions'
import workReducer from '../work/reducer'

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

const originalStatePure = {...originalState}

describe('workReducer', function () {
	afterEach(function () {
		expect(originalState).to.deep.equal(originalStatePure)
	})

	it('returns an empty object when state is undefined', function () {
		const result = workReducer(undefined, {type: 'nothing'})
		expect(result).to.deep.equal({})
	})

	describe('`fetchingWork`', function () {
		it('toggles `isFetching`', function () {
			const action = actions.fetchingWork()
			const result = workReducer(originalState, action)

			expect(result).to.deep.equal({
				isFetching: true,
			})
		})
	})

	describe('`receiveWork`', function () {
		const action = actions.receiveWork({
			data: {
				title: ['New Work'],
				author: ['New Author'],
			}
		})

		const result = workReducer(originalState, action)

		it('data differs from the originalState', function () {
			expect(result.data).to.not.deep.equal(originalState.data)
		})
	})

	describe('`savedWork`', function () {
		const action = actions.savedWork({
			updates: {
				title: ['First Title', 'Another Author'],
				author: ['The Author']
			}
		})

		let data, state

		beforeEach(function () {
			data = {
				title: ['First Title'],
				author: []
			}

			state = {
				data,
			}
		})

		it('merges data with updates', function () {
			const result = workReducer(state, action)

			expect(result.data.title)
				.to.deep.equal(action.payload.updates.title)

			expect(result.data.author)
				.to.deep.equal(action.payload.updates.author)
		})

		it('toggles `isSaving` to false', function () {
			const result = workReducer(state, action)
			expect(result.isSaving).to.be.false
		})
	})

	describe('`saveWork`', function () {
		const action = actions.savingWork()

		let state, result

		beforeEach(function () {
			state = {
				...originalState,
				updates: {
					title: [].concat(originalState.data.title, 'New Title')
				},
				isChanged: true,
			}

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
})
