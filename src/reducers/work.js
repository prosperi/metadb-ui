'use strict'

import { 
	ADD_WORK_VALUE_FIELD,
	FETCH_WORK,
	RECEIVE_WORK,
	REMOVE_WORK,
	REMOVE_WORK_VALUE_FIELD,
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
			let title = action.data.title
			if (Array.isArray(title))
				title = title[0]

			const displayTitle = `[${action.data.id}] ${title}`

			return assign({}, state, {
				isFetching: false,
				data: action.data,
				updated: false,
				displayTitle,
			})

		case REMOVE_WORK:
			return removeWork(state)

		case REMOVE_WORK_VALUE_FIELD:
			return removeWorkValueField(state, action)

		case WORK_CHANGE:
			let data = assign({}, state.data)
			data[action.key][action.index] = action.value
			return assign({}, state, {data, updated: true})

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

function removeWorkValueField (state, action) {
	const update = assign({}, state.data)
	const key = action.key
	const index = action.index

	const field = update[key]
	update[key] = [].concat(field.slice(0, index), field.slice(index + 1))

	return assign({}, state, {data: update})
}
