import { createAction } from 'redux-actions'
import { getVocabulary } from '../vocabulary/endpoints'

import Queue from 'promise-queue'

const queue = new Queue()

let fetchedVocabularies = []

export const fetchingAutocompleteTerms = createAction('fetching autocomplete terms')
export const receiveAutocompleteTerms = createAction('receive autocomplete terms')

export const fetchAutocompleteTerms = vocabulary => {
	return (dispatch, getState) => {
		const genGetVocab = vocab => {
			if (fetchedVocabularies.indexOf(vocab.uri) > -1)
				return

			if (getState().autocompleteTerms[vocab.uri])
				return

			fetchedVocabularies.push(vocab.uri)

			dispatch(fetchingAutocompleteTerms(vocab))
			return getVocabulary(vocab)
		}

		return queue.add(genGetVocab.bind(null, vocabulary)).then(data => {
			if (!data)
				return

			const terms = data.terms.map(t => t.pref_label[0])

			dispatch(receiveAutocompleteTerms({terms, vocabulary}))

			if (queue.getPendingLength() === 0) {
				fetchedVocabularies = []
			}
		})
	}
}

