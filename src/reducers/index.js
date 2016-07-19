import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// import yr reducers

import work from './work'
import collection from './collection'

const rootReducer = combineReducers({
	work,
	collection,
	routing: routerReducer
})

export default rootReducer
