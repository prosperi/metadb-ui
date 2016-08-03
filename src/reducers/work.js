'use strict'

import { 
	ADD_WORK_VALUE_FIELD,
	FETCH_WORK,
	RECEIVE_WORK,
	REMOVE_WORK,
	REMOVE_WORK_VALUE_FIELD,
	SAVE_WORK_CHANGES,
	WORK_CHANGE,
} from '../actions/constants'

import assign from 'object-assign'

export default function workReducer (state, action) {
	if (typeof state === 'undefined')
		return {
			isFetching: false,
			data: {},
		}

	switch (action.type) {
		case ADD_WORK_VALUE_FIELD:
			return addWorkValueField(state, action)

		case FETCH_WORK:
			return assign({}, state, {
				isFetching: true
			})

		case RECEIVE_WORK:
			return receiveWork(state, action)

		case REMOVE_WORK:
			return removeWork(state)

		case REMOVE_WORK_VALUE_FIELD:
			return removeWorkValueField(state, action)

		case SAVE_WORK_CHANGES:
			return saveWorkChanges(state)

		case WORK_CHANGE:
			return workChange(state, action)

		default:
			return state
	}
}

function addWorkValueField (state, action) {
	const updates = assign({}, state.updates)
	const vals = state.data[action.key]

	updates[action.key] = vals.concat('')

	return assign({}, state, { updates })
}

function receiveWork (state, action) {
	return assign({}, state, {
		isFetching: false,
		data: action.data,
		updated: false,
		updates: {},
		saved: true,
	})
}

function removeWork (state) {
	return assign({}, state, {data: {}})
}

function removeWorkValueField (state, action) {
	const key = action.key
	const index = action.index
	const field = state.data[key]

	const update = {}
	update[key] = [].concat(field.slice(0,index), field.slice(index+1))

	const updates = assign({}, state.updates, update)

	return assign({}, state, {updates})
}

function saveWorkChanges (state) {
	const original = state.data
	const updates = state.updates
	const merged = assign({}, original, updates)

	return assign({}, state, {
		data: merged,
		saved: true,
		updated: false,
		updates: {},
	})
}

function workChange (state, action) {
	const data = state.data
	const updates = assign({}, state.updates)
	const key = action.key

	if (!updates[key]) updates[key] = []

	updates[key][action.index] = action.value

	return assign({}, state, {updates, updated: true, saved: false})
}
