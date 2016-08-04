'use strict'

import { 
	ADD_WORK_VALUE_FIELD,
	FETCH_ERROR,
	RECEIVE_WORK,
	REMOVE_WORK,
	REMOVE_WORK_VALUE_FIELD,
	SAVE_WORK_CHANGES,
	WORK_CHANGE,
} from './constants'

// mock data
import {works} from '../../data'

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

export const saveWork = () => dispatch => (
	// TODO: actually make an API call to store changes
	dispatch({
		type: SAVE_WORK_CHANGES,
	})
)

// mock data fetching
export const fetchWork = id => dispatch => {
	for (let i = 0; i < works.length; i++) {
		if (works[i].id === id) {
			return dispatch({
				type: RECEIVE_WORK,
				data: works[i]
			})
		}
	}

	return dispatch({
		type: FETCH_ERROR,
		message: `Work with id ${id} does not exist`
	})
}
