import { handleActions } from 'redux-actions'
import * as actions from './actions'

const addErrorToState = (state, action) => {
	const error = action.payload.error

	return {
		...state,
		error,
	}
}

export default handleActions({
	[actions.fetchingWork]: () => {
		return {
			isFetching: true,
		}
	},

	[actions.fetchingWorkErr]: addErrorToState,

	[actions.receiveWork]: (state, action) => {
		return {
			...state,
			data: action.payload.data,
			isFetching: false,
			isSaving: false,
		}
	},

	[actions.savedWork]: (state, action) => {
		const data = {
			...state.data,
			...action.payload.updates,
		}

		return {
			...state,
			isSaving: false,
			data,
		}
	},

	[actions.savingWork]: state => {
		return {
			...state,
			isSaving: true,
		}
	},

	[actions.savingWorkErr]: addErrorToState,
	[actions.workNotFoundErr]: addErrorToState,
}, {})
