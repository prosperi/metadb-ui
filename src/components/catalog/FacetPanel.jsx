/**
 *  This is intended to be the shell of a pluggable facet system.
 *	The `type` property is used to determine which facet-display
 *  component to use (currently _super_ limited). This also uses
 *  a crude toggle-able system which allows facet-bodies to be
 *  hidden/visible by clicking the `facet-panel-header`
 */

import React from 'react'
import FacetList from './FacetList.jsx'
import FacetListWithViewMore from './FacetListWithViewMore.jsx'
import sortFacets from '../../../lib/sort-facets'

const T = React.PropTypes

const FacetPanel = React.createClass({
	propTypes: {
		// a top-level facet-group object passed from Blacklight.
		data: T.shape({
			// an array of Facet items
			items: T.array.isRequired,

			// the display name for the facet-group
			label: T.string.isRequired,

			// the name for the facet-group
			name: T.string.isRequired,
		}).isRequired,

		// triggered when a `selectedFacet`s `X` button is clicked.
		// (passed to panel-body `SelectedFacetsList` component)
		// @param object  the facet being removed
		onRemoveSelectedFacet: T.func.isRequired,

		// triggered when a facet is selected (passed to panel-body)
		// @param object  the facet being selected
		onSelectFacet: T.func.isRequired,

		// whether or not the panel-body is visible. this is handled in state
		// but this allows us to have a panel open initially
		// (default: `false`)
		open: T.bool,

		// array passed to panel-body to populate `SelectedFacetsList` component
		selectedFacets: T.array,

		// which direction to sort the facets:
		// passing `false` will bypass sorting + use Blacklight order
		// (default: 'desc')
		sort: T.oneOf(['asc', 'desc', false]),

		// which field used to sort (these are properties of facet items)
		// (default: 'hits')
		sortField: T.oneOf(['value', 'label', 'hits']),

		// which panel-body to use when displaying facts
		// (default: 'list')
		type: T.oneOf([
			'list', 'list-view-more',
		]),

		// color of FacetPanel border + header background
		// (default: '#ddd')
		color: T.string,

		// color of FacetPanel border + header background
		// when that Panel contains selectedFacets
		// (default: '#d8ecd8', a subtle/light green)
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

	getInitialState: function () {
		return {
			open: this.props.open,
		}
	},

	determinePanelBody: function () {
		switch (this.props.type) {
			case 'list-view-more':
				return FacetListWithViewMore

			case 'list':
				return FacetList
		}
	},

	renderFacetPanelBody: function () {
		if (!this.state.open)
			return

		const FacetPanelBody = this.determinePanelBody()
		const items = this.props.sort === false 
			? this.props.data.items 
			: this.props.data.items.sort(
					sortFacets(this.props.sort, this.props.sortFeld)
				)

		const props = {
			...this.props,
			items,
		}

		return React.createElement(
			'div',
			{
				className: 'facet-panel--body',
				style: {padding: '5px'}
			},
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
				<header onClick={ev => this.setState({open: !this.state.open})} style={headerStyles}>
					<h3 className="panel-title" style={headerLabel}>{this.props.data.label}</h3>
				</header>

				{this.renderFacetPanelBody()}
			</div>
		)
	}
})

export default FacetPanel
