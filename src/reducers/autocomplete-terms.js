import assign from 'object-assign'
import { RECEIVE_AUTOCOMPLETE_TERMS } from '../constants'

export default function autocompleteTermsReducer (state, action) {
	if (typeof state === 'undefined')
		return {}

	switch (action.type) {
		case RECEIVE_AUTOCOMPLETE_TERMS:
			return receiveTerms(state, action)

		default:
			return state
	}
}

function receiveTerms (state, action) {
	const { uri, terms } = action
	const update = assign({}, state)

	// we're checking for duplicates in the action, but just in case
	if (!update[uri])
		update[uri] = terms

	return update
}
