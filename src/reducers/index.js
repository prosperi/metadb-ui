import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// import yr reducers

import collection from './collection'
import error from './error'
import vocabulary from './vocabulary'
import work from './work'

const rootReducer = combineReducers({
	collection,
	error,
	vocabulary,
	work,
	routing: routerReducer
})

export default rootReducer
