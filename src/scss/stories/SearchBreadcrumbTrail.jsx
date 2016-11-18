import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import SearchBreadcrumbTrail from '../src/components/catalog/SearchBreadcrumbTrail.jsx'

const facets = {
	'Location': [
		{
			'value': 'At the Library',
			'hits': 19523,
			'label': 'At the Library'
		},
		{
			'value': 'On order',
			'hits': 48,
			'label': 'On order'
		},
		{
			'value': 'Online',
			'hits': 8735,
			'label': 'Online'
		},
	]
}

storiesOf('<SearchBreadcrumbTrail />', module)
	.add('default', () => (
		<SearchBreadcrumbTrail
			facets={facets}
			query="some kewl cats"
			onRemoveBreadcrumb={action('remove-breadcrumb')}
		/>
	))
