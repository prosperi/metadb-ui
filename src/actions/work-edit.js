import { 
	ADD_WORK_VALUE_FIELD,
	REMOVE_WORK,
	REMOVE_WORK_VALUE_FIELD,
	WORK_CHANGE,
} from './constants'

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
