// all the api logic
import xhr from 'xhr'
import {
	FETCH_ERROR,

	// our constants
	COLLECTION,
	SCHEMA,
	WORK,

	// sufia constants
	SUFIA_COLLECTION_PATH,
	SUFIA_WORK_PATH,
} from './constants'

import store from '../store'

// ex: https://sporades0.stage.lafayette.edu/concern/generic_works/2227mp65f.json

// IN THE NEAR FUTURE
// we'll check for schema requests to make sure we're not
// doing more api calls than necessary
function fetchApi (which, id) {
	return function dispatchWrapper (dispatch, getState) {
		if (!id) return fetchError(dispatch, 'No ID parameter passed')

		dispatch({type: `FETCH_${which}`})

		const currentState = getState()

		// if (id === currentState.work.data.id 
		// 	|| id === currentState.collection.data.id) {
		// 	return receiveData(currentState.work.data)
		// }

		const parts = [
			'https://sporades0.stage.lafayette.edu',
			'concern'
			// 'http://localhost:8888'
		]

		switch (which) {
			case COLLECTION:
				parts.push(SUFIA_COLLECTION_PATH)
				break
			case WORK:
				parts.push(SUFIA_WORK_PATH)
				break
			default:
				// escape carefully
				return
		}

		parts.push(id + '.json')

		const url = parts.join('/')

		xhr.get(url, function (err, resp, body) {
			if (err) 
				return fetchError(dispatch, err)

			if (typeof body === 'string')
				body = JSON.parse(body)

			return receiveData(body)
		})

		// some dispatch helpers
		function fetchError (err) {
			return dispatch({
				type: FETCH_ERROR,
				err: err instanceof Error ? err.message : err
			})
		}

		function receiveData (data) {
			return dispatch({
				type: `RECEIVE_${which}`,
				data,
			})
		}
	}
}

// actual exports

export function fetchCollection (id) {
	return fetchApi.call(null, COLLECTION, id)
}

export function fetchWork (id) {
	return fetchApi.call(null, WORK, id)
}

