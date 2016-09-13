import {
	CLEAR_ALL_NOTIFICATIONS,
	CLEAR_NOTIFICATION,
	CLEAR_STALE_NOTIFICATIONS,
} from '../constants'

export const clearAllNotifications = () => dispatch => {
	return dispatch({
		type: CLEAR_ALL_NOTIFICATIONS,
	})
}

export const clearNotification = index => dispatch => {
	if (typeof index === 'undefined')
		return

	return dispatch({
		type: CLEAR_NOTIFICATION,
		index,
	})
}

export const clearStaleNotifications = limit => dispatch => {
	if (typeof limit === 'undefined')
		limit = Infinity

	return dispatch({
		type: CLEAR_STALE_NOTIFICATIONS,
		limit,
	})
}
