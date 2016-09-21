import React from 'react'
import assign from 'object-assign'
import SelectedFacetsList from './SelectedFacetsList.jsx'
import FacetListItem from './FacetListItem.jsx'

const T = React.PropTypes

const FacetList = React.createClass({
	propTypes: {
		label: T.string.isRequired,
		name: T.string.isRequired,

		items: T.array.isRequired,
		onRemove: T.func.isRequired,
		onSelect: T.func.isRequired,
		selectedFacets: T.array.isRequired,
	},

	renderFacetList: function () {
		return this.props.items.map((item, index) => {
			const props = {
				data: item,
				key: this.props.name + index,
				onClick: this.props.onSelect,
			}

			return React.createElement(FacetListItem, props)
		})
	},

	renderSelectedFacets: function () {
		const selected = this.props.selectedFacets
		if (!selected.length)
			return

		return (
			<SelectedFacetsList
				onRemove={this.props.onRemove}
				facets={selected}
			/>
		)
	},

	render: function () {
		const styles = {
			list: {
				listStyleType: 'none',
				margin: '0',
				padding: '0',
			}
		}

		return (
			<div>
				{this.renderSelectedFacets()}
				<ul style={styles.list}>
					{this.renderFacetList()}
				</ul>
			</div>
		)
	}
})

export default FacetList
