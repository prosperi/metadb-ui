'use strict'

import { 
	ADD_WORK_VALUE_FIELD,
	FETCH_ERROR,
	FETCH_WORK,
	RECEIVE_WORK,
	REMOVE_WORK,
	REMOVE_WORK_VALUE_FIELD,
	SAVING_WORK_CHANGES,
	SAVE_WORK_CHANGES,
	WORK_CHANGE,
} from './constants'

import { getWork, updateWork } from '../../lib/api'

export const fetchWork = id => (dispatch, getState) => {
	dispatch({type: FETCH_WORK })

	getWork(id, function (err, response) {
		if (err) {
			return dispatch({
				type: FETCH_ERROR,
				data: err
			})
		}

		return dispatch({
			type: RECEIVE_WORK,
			data: response,
		})
	})
}

// work edit

export const addValueField = key => dispatch => (
	dispatch({
		type: ADD_WORK_VALUE_FIELD,
		key
	})
)

export const removeValueField = (key, index) => dispatch => (
	dispatch({
		type: REMOVE_WORK_VALUE_FIELD,
		key,
		index,
	})
)

export const editWorkField = (key, index, value) => dispatch => (
	dispatch({
		type: WORK_CHANGE,
		key,
		index,
		value,
	})
)

export const removeWork = () => dispatch => (
	dispatch({
		type: REMOVE_WORK,
	})
)

export const saveWork = () => (dispatch, getState) => {
	const state = getState()
	const id = state.work.data.id
	const updates = state.work.updates

	dispatch({ type: SAVING_WORK_CHANGES })

	updateWork(id, updates, function (err, res) {
		if (err) {
			// handle errors
		}

		dispatch({
			type: SAVE_WORK_CHANGES,
		})
	})

	// TODO: actually make an API call to store changes
	dispatch({
		type: SAVE_WORK_CHANGES,
	})
}
