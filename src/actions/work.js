import {
	ADD_EMPTY_VALUE_TO_WORK,
	FETCHING_WORK,
	FETCHING_WORK_ERROR,
	RECEIVE_WORK,
	REMOVE_VALUE_FROM_WORK,
	UPDATE_WORK,
	SAVED_WORK,
	SAVING_WORK,
} from '../constants'

import { getWork, updateWork } from '../../lib/api'
// import isFresh from '../../lib/is-fresh'

export const fetchWork = id => (dispatch/*, getState*/) => {
	// const work = getState().work

	// TODO: return an empty promise so if we're chaining
	// this it won't throw an undefined error b/c of a missing
	// `.then` method
	// if (isFresh(work) || work.isFetching)
	// 	return

	dispatch({
		type: FETCHING_WORK,
		id,
	})

	return getWork(id)
		.then(
			data => {
				dispatch({
					type: RECEIVE_WORK,
					data,
				})
			},
			error => {
				dispatch({
					type: FETCHING_WORK_ERROR,
					error,
				})
			}
		)
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
		index,
	})
}

export const saveWork = id => (dispatch, getState) => {
	// TODO
	// 	 bail on save if already saving so to prevent duplicates

	const work = getState().work
	const updates = work.updates

	dispatch({
		type: SAVING_WORK,
		id,
	})

	return updateWork(id, updates)
		.then(() => {
			dispatch({
				type: SAVED_WORK,
			})
		})
		//.catch(err => {})
}
