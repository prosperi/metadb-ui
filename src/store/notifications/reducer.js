import { handleActions } from 'redux-actions'
import * as notifications from './actions'

export default handleActions({
	[notifications.clearNotification]: (state, action) => {
		return [].concat(
			state.slice(0, action.payload.index),
			state.slice(action.payload.index + 1)
		)
	},
}, [])
