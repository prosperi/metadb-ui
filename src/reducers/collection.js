'use strict' 

import {
	COLLECTION_CHANGE,
	FETCH_COLLECTION,
	RECEIVE_COLLECTION,
	SAVE_COLLECTION_CHANGES,
} from '../actions/constants'

import assign from 'object-assign'

export default function collectionReducer (state, action) {
	if (typeof state === 'undefined') {
		return {
			isFetching: false,
			data: {},
			saved: false,
			schema: {},
			updated: false,
			updates: {},
		}
	}

	let updates
	let data, schema
	let original, merged

	switch (action.type) {
		case COLLECTION_CHANGE:
			updates = assign({}, state.updates)
			updates[action.key] = action.value

			return assign({}, state, {
				saved: false,
				updated: true,
				updates,
			})

		case FETCH_COLLECTION:
			return assign({}, state, {
				isFetching: true,
			})

		// case FETCH_SCHEMA:
		// 	return assign({}, state, {
		// 		isFetching: true,
		// 	})

		case RECEIVE_COLLECTION:
			data = assign({}, action.data)
			schema = assign({}, data.schema)
			delete data.schema

			return assign({}, state, {
				isFetching: false,
				data: data,
				schema: schema
			})

		case SAVE_COLLECTION_CHANGES:
			original = state.data
			updates = state.updates
			merged = assign({}, original, updates)

			return assign({}, state, {
				data: merged,
				saved: true,
				updates: {},
				updated: false,
			})


		// case RECEIVE_SCHEMA:
		// 	return assign({}, state, {
		// 		isFetching: false,
		// 		schema: action.schema,
		// 	})

		default:
			return state
	}
}
