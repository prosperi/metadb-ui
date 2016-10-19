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
import RangeLimitFacetWrapper from './RangeLimitFacetWrapper.jsx'
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

		// whether or not to display an angled line ('arrow' w/o a stem) as visual
		// feedback on the facet-header
		// (default: `true`)
		showHeaderArrow: T.bool,

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
			'list', 'list-view-more', 'range',
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
			showHeaderArrow: true,
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

			case 'range':
				return RangeLimitFacetWrapper

			case 'list':
			default:
				return FacetList
		}
	},

	maybeRenderHeaderArrow: function () {
		if (!this.props.showHeaderArrow)
			return

		const transformDeg = this.state.open ? 90 : 0
		const arrowSvg = [
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">',
			'<path d="M2,1L8,5L2,9" stroke="%23000" stroke-width="2" fill="transparent" />',
		'</svg>'].join('')

		const props = {
			key: 'dss-fp-header-arrow',
			style: {
				backgroundImage: 'url(\'data:image/svg+xml;utf8,' + arrowSvg + '\')',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center center',
				display: 'inline-block',
				float: 'right',
				height: '15px',
				marginLeft: '15px',
				marginTop: '2px',
				transform: 'rotate(' + transformDeg + 'deg)',
				// transition: 'transform 75ms ease-out',
				verticalAlign: 'middle',
				width: '20px',
			}
		}

		return React.createElement('span', props)
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
			margin: '5px 0',
		}

		const headerStyles = {
			backgroundColor: this.props.color,
			cursor: 'pointer',
			padding: '5px',
		}

		const headerLabel = {
			margin: '0',
			padding: '0',
			verticalAlign: 'middle',
		}

		if (this.props.selectedFacets.length) {
			panelStyles.borderColor = this.props.hasSelectedFacetsColor
			headerStyles.marginBottom = this.props.open ? '4px' : '0'
			headerStyles.backgroundColor = this.props.hasSelectedFacetsColor
		}

		return (
			<div className="facet-panel" style={panelStyles}>
				<header onClick={ev => this.setState({open: !this.state.open})} style={headerStyles}>
					<h3 className="panel-title" style={headerLabel}>
						{this.props.data.label}
						{this.maybeRenderHeaderArrow()}
					</h3>
				</header>

				{this.renderFacetPanelBody()}
			</div>
		)
	}
})

export default FacetPanel
