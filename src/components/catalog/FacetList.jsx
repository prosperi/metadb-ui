import React from 'react'
import assign from 'object-assign'
import FacetListItem from './FacetListItem.jsx'

const T = React.PropTypes

const FacetList = React.createClass({
	propTypes: {
		label: T.string.isRequired,
		name: T.string.isRequired,

		items: T.array.isRequired,
		onChange: T.func.isRequired,
		selectedValues: T.array.isRequired,
	},

	renderFacetList: function () {
		const selValues = this.props.selectedValues

		return this.props.items.map((item, index) => {
			const props = assign({}, item, {
				key: this.props.name + index,
				selected: !!(selValues.length && selValues.indexOf(item.value) > -1),
				onChange: this.props.onChange.bind(null, this.props.name),
			})

			return React.createElement(FacetListItem, props)
		})
	},

	render: function () {
		return (
			<ul>
				{this.renderFacetList()}
			</ul>
		)
	}
})

export default FacetList
