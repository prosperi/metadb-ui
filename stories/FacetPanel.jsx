import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import FacetPanel from '../src/components/catalog/FacetPanel.jsx'

const items = [
	{ label: 'Item one', hits: 15, value: 'item_one' },
	{ label: 'Item two', hits: 24, value: 'item_two' },
	{ label: 'Item three', hits: 12, value: 'item_three' },
	{ label: 'Item four', hits: 22, value: 'item_four' },
	{ label: 'Item five', hits: 10, value: 'item_five' },
]

const defaultProps = {
	items,
	onChange: action('change'),
	onToggle: action('toggle'),
	name: 'test_facet_panel',
	label: 'Test Facet Panel',
	open: true,
}

storiesOf('<FacetPanel />', module)
	.add('default, list', () => (
		<FacetPanel {...defaultProps}/>
	))
	.add('default, list, with selected values', () => {
		const selectedValues = ['item_three', 'item_one']

		return <FacetPanel {...defaultProps} {...{selectedValues}} />
	})
