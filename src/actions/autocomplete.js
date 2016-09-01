'use strict'

import { getVocabulary } from '../../lib/api'
import { RECEIVE_AUTOCOMPLETE_TERMS } from './constants'

const autocompleteQueue = []
const fetchedUris = []
let fetching = false
let vocabData

export function fetchAutocompleteTerms (data) {
	return (dispatch, getState) => {
		if (fetching) {
			if (existsInQueue(data))
				return

			autocompleteQueue.push(data)
			return
		}

		return getAutocompleteTerms(data)

		function getAutocompleteTerms (data) {
			// we're at the end of the queue
			if (!data) {
				fetching = false
				return
			}

			// get a fresh state + check to see if we've already fetched
			// this uri before
			const terms = getState().autocompleteTerms

			if (terms.hasOwnProperty(data.uri))
				return

			fetching = true

			getVocabulary(data.absolute_path, function (err, results) {
				if (err) {
					// dispatch autocomplete error
					return
				}

				const terms = results.terms.map(t => t.pref_label[0])
				
				dispatch({
					type: RECEIVE_AUTOCOMPLETE_TERMS,
					uri: data.uri,
					terms,
				})

				return getAutocompleteTerms(autocompleteQueue.shift())
			})
		}
	}
}

function existsInQueue (data) {
	let item, i

	for (i = 0; i < autocompleteQueue.length; i++) {
		item = autocompleteQueue[i]
		if (item.uri === data.uri || item.absolute_path === data.absolute_path)
			return true
	}

	return false
}
