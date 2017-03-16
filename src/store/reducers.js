import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import activeVocabularyTerms from '../reducers/active-vocabulary-terms'
import autocompleteTerms from './autocomplete/reducer'
import notifications from '../reducers/notifications'
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
