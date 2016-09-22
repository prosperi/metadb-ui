import React from 'react'
import assign from 'object-assign'
import SelectedFacetsList from './SelectedFacetsList.jsx'
import FacetListItem from './FacetListItem.jsx'

const T = React.PropTypes

const FacetList = React.createClass({
	propTypes: {
		// data related to the facet (as returned from the Blacklight JSON api)
		data: T.shape({
			label: T.string.isRequired,
			name: T.string.isRequired,
			items: T.array.isRequired,
		}).isRequired,

		onRemoveSelectedFacet: T.func.isRequired,
		onSelectFacet: T.func.isRequired,
		selectedFacets: T.array.isRequired,
	},

	renderFacetList: function () {
		const { items, name, onSelectFacet } = this.props.data

		return items.map((item, index) => {
			const props = {
				data: item,
				onClick: this.props.onSelectFacet,
			}

			return React.createElement(
				'li', 
				{ key: name + index },
				React.createElement(FacetListItem, props)
			)
		})
	},

	renderSelectedFacets: function () {
		const selected = this.props.selectedFacets
		if (!selected.length)
			return

		return (
			<SelectedFacetsList
				onRemove={this.props.onRemoveSelectedFacet}
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
