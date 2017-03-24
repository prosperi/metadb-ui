import { handleActions } from 'redux-actions'
import { receiveAutocompleteTerms } from './actions'

export default handleActions({
	[receiveAutocompleteTerms]: (state, action) => {
		const terms = action.payload.terms
		const uri = action.payload.vocabulary.uri

		return {
			...state,
			[uri]: terms,
		}
	}
}, {})
