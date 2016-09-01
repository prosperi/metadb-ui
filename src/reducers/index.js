import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import activeVocabularyTerms from './active-vocabulary-terms'
import autocompleteTerms from './autocomplete-terms'
import vocabularies from './vocabularies'
import work from './work'

const routeReducer = combineReducers({
	activeVocabularyTerms,
	autocompleteTerms,
	vocabularies,
	work,

	routing: routerReducer,
})

export default routeReducer
