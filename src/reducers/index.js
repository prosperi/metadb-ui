import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// import yr reducers

import work from './work'
import collection from './collection'
import error from './error'

const rootReducer = combineReducers({
	work,
	collection,
	error,
	routing: routerReducer
})

export default rootReducer
