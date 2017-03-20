import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import activeVocabularyTerms from '../active-vocabulary-terms/reducer'
import autocompleteTerms from './autocomplete/reducer'
import notifications from '../notifications/reducer'
import search from './search/reducer'
import vocabularies from '../reducers/vocabularies'
import work from './work/reducer'

const routeReducer = combineReducers({
	activeVocabularyTerms,
	autocompleteTerms,
	notifications,
	search,
	vocabularies,
	work,

	routing: routerReducer,
})

export default routeReducer
