import { createAction } from 'redux-actions'
import * as api from './endpoints'

export const fetchingWork = createAction('fetching work')
export const fetchingWorkErr = createAction('error fetching work')
export const receiveWork = createAction('receive work')
export const savedWork = createAction('saved work')
export const savingWork = createAction('saving work')
export const savingWorkErr = createAction('error saving work')
export const workNotFoundErr = createAction('error work not found')

export const fetchWork = id => {
	return dispatch => {
		dispatch(fetchingWork({id}))

		return api.getWork(id)
			.then(data => dispatch(receiveWork({data})))
			.catch(err => {
				err.id = id

				if (err.status === 404) {
					dispatch(workNotFoundErr(err))
					return
				}

				dispatch(fetchingWorkErr(err))
			})
	}
}

export const saveWork = (id, updates) => {
	return dispatch => {
		dispatch(savingWork({id, updates}))

		return api.updateWork(id, updates)
			.then(() => dispatch(savedWork({id, updates})))
			.catch(err => dispatch(savingWorkErr(err)))
	}
}
