import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import SelectedFacetsList from '../src/components/catalog/SelectedFacetsList.jsx'

storiesOf('<SelectedFacetsList />', module)
	.add('w/ some items', () => {
		const values = [
			{
				label: 'Value One',
				value: 'value_one',
			},
			{
				label: 'Value Two',
				value: 'value_two',
			}
		]
		return <SelectedFacetsList values={values} onRemove={action('remove')} />
	})
