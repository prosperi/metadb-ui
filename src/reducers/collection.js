'use strict' 

import {
	FETCH_COLLECTION,
	RECEIVE_COLLECTION
} from '../actions/constants'

import assign from 'object-assign'

export default function collectionReducer (state, action) {
	if (typeof state === 'undefined') {
		return {
			isFetching: false,
			data: {},
			schema: {},
		}
	}

	switch (action.type) {
		case FETCH_COLLECTION:
			return assign({}, state, {
				isFetching: true,
			})

		// case FETCH_SCHEMA:
		// 	return assign({}, state, {
		// 		isFetching: true,
		// 	})

		case RECEIVE_COLLECTION:
			let data = assign({}, action.data)
			const schema = assign({}, data.schema)
			delete data.schema

			return assign({}, state, {
				isFetching: false,
				data: data,
				schema: schema
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
