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

// since the approach for fetching collections + works is essentially the same,
// we'll extract a common fetch function and export wrappers
function fetchApi (which, id) {
	return function dispatchWrapper (dispatch, getState) {
		if (!id) return fetchError(dispatch, 'No ID parameter passed')

		// flip the `isFetching` flag in our `which`
		dispatch({type: `FETCH_${which}`})

		const currentState = getState()

		// before we actually make an xhr call, we should make sure
		// that what we're fetching isn't already fetched. in the future
		// we may want to put in something that'll make sure the state
		// data doesn't get too stale (say the window is left open + another
		// makes conflicting changes)
		if (which === WORK) 
			if (id === currentState.work.data.id) 
				return receiveData(currentState.work.data)

		if (which === COLLECTION)
			if (id === currentState.collection.data.name)
				return receiveData({
					name: currentState.collection.data.name,
					description: currentState.collection.data.description,
					schema: currentState.collection.schema,
				})

		// if not already in state, let's clear out the previous item so that
		// we're not in a position where the old one renders before the new one
		// is fetched
		dispatch({type: `REMOVE_${which}`})

		// TODO: extract this to a constant?
		const parts = [
			'https://sporades0.stage.lafayette.edu',
			'concern',
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

		// some dispatch helpers, kept in the scope of
		// `fetchApi` so we can use the dispatch instance
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

