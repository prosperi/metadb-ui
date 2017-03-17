import { createAction } from 'redux-actions'
import { batchUpdates } from './endpoints'

export const batchUpdatingWorks = createAction('batch updating works')
export const batchUpdatingWorksErr = createAction('error batch updating works')
export const setBatchWorksUpdated = createAction('batch works updated')

export const batchUpdateWorks = updates => {
	return (dispatch, getState) => {
		const state = getState()
		const { facets, query, results } = state.search

		const count = results && results.pages ? results.pages.total_count : undefined

		const search = {
			facets: {},
			range: {},
			query,
		}

		const facetKeys = Object.keys(facets)

		for (let i = 0; i < facetKeys.length; i++) {
			const key = facetKeys[i]

			const target = facets[key][0].type === 'range' ? 'range' : 'facets'

			// we need to extract range facets from w/in `facets` and put them
			// into their own section of search to comply w/ how Blacklight handles them
			search[target][key] = [].concat(facets[key].map(f => f.value))
		}

		dispatch(batchUpdatingWorks({updates, count}))

		return batchUpdates({search, updates})
			.then(() => dispatch(setBatchWorksUpdated({count})))
			.catch(error => dispatch(batchUpdatingWorksErr(error)))
	}
}
