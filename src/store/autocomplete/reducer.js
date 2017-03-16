import { handleActions } from 'redux-actions'
import { receiveVocabularyTerms } from './actions'

export default handleActions({
	[receiveVocabularyTerms]: (state, action) => {
		const terms = action.payload.terms
		const uri = action.payload.vocabulary.uri

		return {
			...state,
			[uri]: terms,
		}
	}
}, {})
