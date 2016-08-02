import {
	CLEAR_SEARCH,
	IS_SEARCHING,
	RECEIVE_SEARCH_RESULTS,
} from './constants'

import qs from 'querystring'

export const clearSearch = opts => dispatch => (
	dispatch({type: CLEAR_SEARCH})
)

export const searchWorks = queryString => (dispatch, getState) => {
	const parsed = qs.parse(queryString.substr(1))

	const terms = parsed.terms
	const collection = parsed.collection
	const field = parsed.field

	const state = getState()
	const originalQs = state.search.queryString

	if (originalQs && (originalQs === queryString)) {
		return dispatch({
			type: 'ALREADY_HAVE_RESULTS',
		})
	}

	dispatch({type: IS_SEARCHING})

	// stuffed search results
	const results = [
		{
			thumbnail: '/assets/lc-spcol-pacwar-postcards-0001-300.jpg',
			collectionId: 'pacwar-postcards',
			itemId: 1,
			metadata: {
				'description.critical': 'The letter was sent to the 324th Philippines Expeditionary Force Field Post Office, attn: 1st branch office "I" Unit #1061 and postmarked December 24th, 1945. The rubber stamp "C.C.D" stands for the "Civil Censorship Detachment" (of General Headquarters) and "321" indicates the office that processed the letter. The "PC" logo inside of the shield-shaped stamp indicates that this communication was approved by the censor (Censorship-Passed).',
				'subject.ocm': '200 COMMUNICATION',
			},
		},
		{
			thumbnail: '/assets/lc-spcol-pacwar-postcards-0002-300.jpg',
			collectionId: 'pacwar-postcards',
			itemId: 2,
			metadata: {
				'description.critical': 'The letter was sent to the Philippines Expeditionary Force, [unit number illegible], company name "Naka[illegible] and postmarked November, 1945. The rubber stamp "C.C.D" stands for the "Civil Censorship Detachment" (of General Headquarters) and "134" indicates the office that processed the letter. The "PC" logo inside of the shield-shaped stamp indicates that this communication was approved by the censor (Censorship-Passed)',
				'subject.ocm': '200 COMMUNICATION',
			},
		},
		{
			thumbnail: '/assets/lc-spcol-pacwar-postcards-0003-300.jpg',
			collectionId: 'pacwar-postcards',
			itemId: 3,
			metadata: {
				'description.critical': 'This image is posted publicly for non-profit educational use, excluding print publication. For additional information, please see http://digital.lafayette.edu/copyright for our Reproduction, Use, and Copyright Guidelines.',
				'subject.ocm': '200 COMMUNICATION',
			},
		},
		{
			thumbnail: '/assets/lc-spcol-pacwar-postcards-0004-300.jpg',
			collectionId: 'pacwar-postcards',
			itemId: 4,
			metadata: {
				'description.critical': 'The letter was sent to the "Tama" unit #5916, Miyauchi company. The rubber stamp "C.C.D.J" stands for the "Civil Censorship Detachment Japan" (of General Headquarters) and "131" indicates the office that processed the letter. The code indicates that this card was processed in Tokyo. The "PC" logo inside of the shield-shaped stamp indicates that this communication was approved by the censor (Censorship-Passed).',
				'subject.ocm': '200 COMMUNICATION',
			},
		},
		{
			thumbnail: '/assets/lc-spcol-pacwar-postcards-0005-300.jpg',
			collectionId: 'pacwar-postcards',
			itemId: 5,
			metadata: {
				'description.critical': 'The letter was sent to the Philippines Expeditionary Force, Kaki Unit #6554, Kamitani company. Postmarked November 17, 1945. The rubber stamp "C.C.D." stands for the "Civil Censorship Detachment Japan" (of General Headquarters) and "133" indicates the office that processed the letter. The "PC" logo inside of the shield-shaped stamp indicates that this communication was approved by the censor (Censorship-Passed).',
				'subject.ocm': '200 COMMUNICATION',
			},
		},
	]

	return setTimeout(sendDispatch, 1500)

	function sendDispatch () {
		return dispatch({
			type: RECEIVE_SEARCH_RESULTS,
			data: results,
			query: {terms, collection, field},
			queryString,
		})
	}
}
