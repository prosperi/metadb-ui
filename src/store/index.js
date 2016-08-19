'use strict'

import { createStore, applyMiddleware } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

const initialState = {
	// collection: {},
	// error: {},
	// search: {},
	terms: {},
	vocabulary: {},	
	work: {},

	// user: {},

	// kept for React-Router
	routing: {},
}

const middlewares = [thunk]

const store = createStore(
	rootReducer, 
	initialState,
	applyMiddleware.apply(null, middlewares)
)

// set up module hot-loading
if (module.hot) {
	module.hot.accept('../reducers/', () => {
		const nextRootReducer = require('../reducers').default
		store.replaceReducer(nextRootReducer)
	})
}

export default store

export const history = syncHistoryWithStore(browserHistory, store)
