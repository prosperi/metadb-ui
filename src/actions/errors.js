import { REMOVE_ERROR } from './constants'
import empty from 'is-empty-object'

export const removeError = () => (dispatch, getState) => {
	if (!empty(getState().error)) 
		dispatch({type: REMOVE_ERROR})
}
