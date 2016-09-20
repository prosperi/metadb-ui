import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import FacetPanel from '../src/components/catalog/FacetPanel.jsx'
import sortByHits from '../lib/sort-by-hits'

const items = [
	{ label: 'Item one', hits: 15, value: 'item_one' },
	{ label: 'Item two', hits: 24, value: 'item_two' },
	{ label: 'Item three', hits: 12, value: 'item_three' },
	{ label: 'Item four', hits: 22, value: 'item_four' },
	{ label: 'Item five', hits: 10, value: 'item_five' },
]

const defaultProps = {
	items,
	onRemove: action('remove'),
	onSelect: action('select'),
	onToggle: action('toggle'),
	name: 'test_facet_panel',
	label: 'Test Facet Panel',
	open: true,
}

const ToggleExample = React.createClass({
	getInitialState: function () {
		return {
			items: sortByHits(this.props.items),
			open: false,
			selected: [],
		}
	},
	handleRemove: function (facet) {
		this.setState({
			items: sortByHits(this.state.items.concat(facet)),
			selected: this.state.selected.filter(f => f.value !== facet.value),
		})
	},
	handleSelect: function (facet) {
		this.setState({
			items: sortByHits(this.state.items.filter(f => f.value !== facet.value)),
			selected: this.state.selected.concat(facet),
		})
	},
	render: function () {
		return (
			<FacetPanel
				{...this.props}
				items={this.state.items}
				open={this.state.open}
				onRemove={this.handleRemove}
				onSelect={this.handleSelect}
				onToggle={() => this.setState({open: !this.state.open})}
				selectedValues={this.state.selected}
				type="list"
			/>
		)
	}
})

storiesOf('<FacetPanel />', module)
	.add('default, list', () => (
		<FacetPanel {...defaultProps}/>
	))
	.add('default, list, with selected values', () => (
		<ToggleExample {...defaultProps}/>
	))
