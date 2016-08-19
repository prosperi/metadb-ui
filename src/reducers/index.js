import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import terms from './terms'
import vocabulary from './vocabulary'
import work from './work'

const routeReducer = combineReducers({
	terms,
	vocabulary,
	work,

	routing: routerReducer,
})

export default routeReducer
