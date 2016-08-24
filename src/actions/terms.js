import {
	FETCHING_TERMS,
	RECEIVE_TERMS,
	RECEIVE_TERMS_ERROR,
} from './constants'

import { get } from '../../lib/api/request'
import isFresh from '../../lib/is-fresh'

// older than a minute is stale, let's say
const STALE_TIME = 60 * 1000

export const fetchTerms = data => (dispatch, getState) => {
	const terms = getState().terms
	const uri = data.uri
	const absPath = data.absolute_path

	if (terms[uri] && terms[uri].isFetching) {
		return
	}

	if (isFresh(terms[uri], STALE_TIME)) {
		return
	}

	dispatch({
		type: FETCHING_TERMS,
		uri,
	})
	
	// TODO: straighten out absolute/relative path
	get(absPath, (err, results) => {
		if (err) {
			return dispatch({
				type: RECEIVE_TERMS_ERROR,
			})
		}

		dispatch({
			type: RECEIVE_TERMS,
			data: results.terms,
			uri,
		})
	})
}
