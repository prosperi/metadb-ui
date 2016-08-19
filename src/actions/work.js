import {
	ADD_EMPTY_VALUE_TO_WORK,
	FETCHING_WORK,
	RECEIVE_WORK,
	REMOVE_VALUE_FROM_WORK,
	UPDATE_WORK,
	SAVED_WORK,
	SAVING_WORK,
} from './constants'

import { getWork, updateWork } from '../../lib/api'
import isFresh from '../../lib/is-fresh'

export const fetchWork = id => (dispatch, getState) => {
	const work = getState().work

	if (isFresh(work) || work.isFetching)
		return

	dispatch({
		type: FETCHING_WORK,
		id,
	})

	getWork(id, (err, data) => {
		return dispatch({
			type: RECEIVE_WORK,
			data,
		})
	})
}

export const addEmptyValueToWork = key => dispatch => {
	return dispatch({
		type: ADD_EMPTY_VALUE_TO_WORK,
		key,
	})
}

export const editWorkField = (key, index, value) => dispatch => {
	return dispatch({
		type: UPDATE_WORK,
		key,
		index,
		value,
	})
}

export const removeValueFromWork = (key, index) => dispatch => {
	return dispatch({
		type: REMOVE_VALUE_FROM_WORK,
		key,
		index,	})
}

export const saveWork = (id) => (dispatch, getState) => {
	// TODO
	// 	 bail on save if already saving so to prevent duplicates

	const work = getState().work
	const updates = work.updates

	dispatch({
		type: SAVING_WORK,
		id,
	})

	updateWork(id, updates, (err, res) => {
		if (err) {
			// saving error
		}

		if (res.status !== 'ok') {
			// not-ok error
		}

		dispatch({
			type: SAVED_WORK,
		})
	})
}
