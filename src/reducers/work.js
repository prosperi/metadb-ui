'use strict'

import { 
	ADD_WORK_VALUE_FIELD,
	FETCH_WORK,
	RECEIVE_WORK,
	REMOVE_WORK,
	WORK_CHANGE,
} from '../actions/constants'

import assign from 'object-assign'

export default function workReducer (state, action) {
	if (typeof state === 'undefined')
		return {
			isFetching: false,
			data: {},
		}

	let data

	switch (action.type) {
		case ADD_WORK_VALUE_FIELD:
			return addWorkValueField(state, action)

		case FETCH_WORK:
			return assign({}, state, {
				isFetching: true
			})

		case RECEIVE_WORK:
			return assign({}, state, {
				isFetching: false,
				data: action.data,
			})

		case REMOVE_WORK:
			return removeWork(state)

		case WORK_CHANGE:
			data = assign({}, state.data)
			data[action.key][action.index] = action.value
			return assign({}, state, {data})

		default:
			return state
	}
}

function addWorkValueField (state, action) {
	const data = assign({}, state.data)
	const vals = data[action.key]

	data[action.key] = vals.concat('')

	return assign({}, state, { data: data })
}

function removeWork (state) {
	return assign({}, state, {data: {}})
}
