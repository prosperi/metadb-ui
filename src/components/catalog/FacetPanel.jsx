import React from 'react'
import FacetList from './FacetList.jsx'
import sortFacets from '../../../lib/sort-facets'

const T = React.PropTypes

const FacetPanel = React.createClass({
	propTypes: {
		items: T.array.isRequired,
		label: T.string.isRequired,
		name: T.string.isRequired,
		onRemove: T.func.isRequired,
		onSelect: T.func.isRequired,
		onToggle: T.func.isRequired,

		open: T.bool,
		selectedFacets: T.array,
		sort: T.oneOf(['asc', 'desc', false]),
		sortField: T.oneOf(['value', 'label', 'hits']),
		type: T.oneOf(['list']),

		color: T.string,
		hasSelectedFacetsColor: T.string,
	},

	getDefaultProps: function () {
		return {
			color: '#ddd',
			hasSelectedFacetsColor: '#d8ecd8',
			open: false,
			selectedFacets: [],
			sort: 'desc',
			sortField: 'hits',
			type: 'list',
		}
	},

	determinePanelBody: function () {
		switch (this.props.type) {

			case 'list':
				return FacetList
		}
	},

	renderFacetPanelBody: function () {
		if (!this.props.open)
			return

		const FacetPanelBody = this.determinePanelBody()
		const items = this.props.sort === false 
			? this.props.items 
			: this.props.items.sort(sortFacets(this.props.sort, this.props.sortFeld))

		const props = {
			...this.props,
			items,
		}

		return React.createElement(
			'div',
			{style: {padding: this.props.open ? '5px' : '0'}},
			React.createElement(FacetPanelBody, props)
		)
	},

	render: function () {
		const panelStyles = {
			borderColor: this.props.color,
			borderWidth: '1px',
			borderStyle: 'solid',
			borderRadius: '2px',
			margin: '5px',
			width: '25%',
		}

		const headerStyles = {
			backgroundColor: this.props.color,
			cursor: 'pointer',
			padding: '5px',
		}

		const headerLabel = {
			margin: '0',
			padding: '0',
		}

		if (this.props.selectedFacets.length) {
			panelStyles.borderColor = this.props.hasSelectedFacetsColor
			headerStyles.marginBottom = this.props.open ? '4px' : '0'
			headerStyles.backgroundColor = this.props.hasSelectedFacetsColor
		}

		return (
			<div className="facet-panel" style={panelStyles}>
				<header onClick={this.props.onToggle.bind(null, !this.props.open)} style={headerStyles}>
					<h3 className="panel-title" style={headerLabel}>{this.props.label}</h3>
				</header>

				{this.renderFacetPanelBody()}
			</div>
		)
	}
})

export default FacetPanel
