import sprintf from 'sprintf-js'

export const OK = 'ok'
export const ERROR = 'error'

// creates the payload for a notification object
export const createNotification = (type, template, data) => {
	const message = sprintf(template, data)
	return {
		type,
		message,
		time: Date.now(),
	}
}

export const errorMessage = (template, data) => (
	createNotification(ERROR, template, data)
)

// at the moment, similar to `successMessage`
export const message = (template, data) => (
	createNotification(OK, template, data)
)

export const successMessage = (template, data) => (
	createNotification(OK, template, data)
)

// keep it d.r.y.
export const bulkMessageReducer = (templateWithoutCount, templateWithCount) => {
	if (!templateWithCount) {
		templateWithCount = templateWithoutCount
	}

	return (state, action) => {
		const { payload } = action
		const { count } = payload
		const hasCount = hasProperty(payload, 'count')
		const template = hasCount ? templateWithCount : templateWithoutCount

		// if we're using the generic without-count message,
		// than this data is irrelevant.
		const data = {
			count: Number(payload.count),
			workDisplay: count && count === 1 ? 'work' : 'works',
		}

		return [].concat(state, message(template, data))
	}

}

export const vocabularyMessageReducer = (template) => {
	return (state, action) => {
		const data = {
			label: action.pref_label[0] || action.uri || 'Unknown Vocabulary',
		}

		if (action.error) {
			data.message = action.error.message
		}

		const msgCreator = action.error ? errorMessage : successMessage

		return [].concat(state, msgCreator(template, data))
	}
}
