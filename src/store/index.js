'use strict'

import { createStore, applyMiddleware } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

const initialState = {
	collection: {
		// preloading our schema/collection data for testing,
		// be sure to empty out the top level attributes!!!
		isFetching: false,
		data: {
			name: 'test-collection',
			description: 'An archive of non-existing objects'
		},
		schema: {
			title: {
				multipleValues: true,
			},
			description: {
				largerField: true,
				multipleValues: false,
			},
			creator: {
				multipleValues: true,
			},
			contributor: {
				multipleValues: true,
			},
			keyword: {
				multipleValues: true,
			},
			subject: {
				multipleValues: true,
			}
		},

		// prestuffed ids
		works: [
			{ id: '2227mp65f' },
			{ id: 'b2773v68h' },
		],

		saved: false,
		updates: null,
	},

	error: {},

	work: {
		isFetching: false,
		updated: false,
		data: {},
		updates: null,
		saved: false,
	},

	// vocabs consist of
	// {[vocabName]: [ /* ... terms, moreTerms ... */ ]}
	vocabulary: {

	},

	// user: {

	// },

	routing: {},
}

const middlewares = [thunk]

// if (typeof window === 'object' && window.devToolsExtension) {
// 	let dev = window.devToolsExtension()
// 	if (dev) middlewares.unshift(dev)
// }

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
