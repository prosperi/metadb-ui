import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import FacetListWithViewMore from '../src/components/catalog/FacetListWithViewMore.jsx'
import facets from './data/facets.json'

const find = (arr, fn) => {
	for (let i = 0; i < arr.length; i++)
		if (fn.call(arr, arr[i], i, arr))
			return arr[i]

	return null
}

const pubyear = find(facets, f => f.name === 'pub_year_tisim')

storiesOf('FacetListWithViewMore', module)
	.add('defaults', () => (
		<FacetListWithViewMore
			data={pubyear}
			onRemoveSelectedFacet={action('remove')}
			onSelectFacet={action('selected!')}
			selectedFacets={[]}
		/>
	))
