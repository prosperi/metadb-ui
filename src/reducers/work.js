import {
	ADD_EMPTY_VALUE_TO_WORK,
	FETCHING_WORK,
	RECEIVE_WORK,
	REMOVE_VALUE_FROM_WORK,
	UPDATE_WORK,
	SAVED_WORK,
	SAVING_WORK,
} from '../actions/constants'

import assign from 'object-assign'

export default function workReducer (state, action) {
	if (typeof state === 'undefined')
		return {}

	switch (action.type) {
		case ADD_EMPTY_VALUE_TO_WORK:
			return addEmptyValueToWork(state, action)

		case FETCHING_WORK:
			return fetchingWork(state, action)

		case RECEIVE_WORK:
			return receiveWork(state, action)

		case REMOVE_VALUE_FROM_WORK:
			return removeValueFromWork(state, action)

		case SAVED_WORK:
			return savedWork(state, action)

		case SAVING_WORK:
			return savingWork(state, action)

		case UPDATE_WORK:
			return updateWork(state, action)

		default:
			return state
	}
}

function addEmptyValueToWork (state, action) {
	const data = state.data
	const updates = state.updates
	const key = action.key

	if (!updates[key])
		updates[key] = [].concat(data[key], '')
	else
		updates[key] = [].concat(updates[key], '')

	return assign({}, state, {updates})

}

function fetchingWork (state, action) {
	return {
		isFetching: true,
	}
}

function receiveWork (state, action) {
	return {
		data: action.data,
		fetchedAt: Date.now(),
		isFetching: false,
		isSaving: false,
		updates: {},
	}
}

function removeValueFromWork (state, action) {
	const data = state.data
	const updates = state.updates

	const key = action.key
	const index = action.index

	// TODO: refactor this
	if (updates[key]) {
		updates[key] = [].concat(
			updates[key].slice(0, index),
			updates[key].slice(index + 1)
		)
	} else {
		updates[key] = [].concat(
			data[key].slice(0, index),
			data[key].slice(index + 1)
		)
	}

	console.log('remove value updates', updates)

	return assign({}, state, {updates})
}

function savedWork (state, action) {
	return assign({}, state, {
		data: assign({}, state.data, state.updates),
		isSaving: false,
		updates: {},
	})
}

function savingWork (state, action) {
	return assign({}, state, {isSaving: true})
}

// when changing value to '', for some reason every value
// is being removed!!

function updateWork (state, action) {
	const key = action.key
	const index = action.index
	const val = action.value

	const data = state.data
	const updates = state.updates

	if (!updates[key])
		updates[key] = data[key]

	updates[key][index] = val

	return assign({}, state, {updates})
}
