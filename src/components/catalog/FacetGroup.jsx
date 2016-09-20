import React from 'react'
import FacetPanel from './FacetPanel.jsx'

const T = React.PropTypes

const FacetGroup = React.createClass({
	propTypes: {
		// `facets` is an array of facet-objects from blacklight.
		// ----------
		// "facets": [
		//		{
		//			"label": "Database Topic",
		//			"name": "db_az_subject",
		//			"items": [
		//				{
		//					"value": "American History",
		//					"label": "American History",
		//					"hits": 100,
		//				}
		//			]
		//		}
		//	]
		facets: T.arrayOf(T.shape({
			name: T.string,
			label: T.string,
			items: T.arrayOf(T.shape({
				hits: T.number,
				label: T.string,
				value: T.string,
			}))
		})).isRequired,

		onRemoveFacet: T.func.isRequired,
		onSelectFacet: T.func.isRequired,

		facetTypes: T.object,

		// `selectedFacets` is a map of facet objects
		// -----------
		// {
		//   `example_name`: [
		//		  { value: 'Facet 1', name: 'Facet 1', hits: 200 },
		//	 ]
		// }
		selectedFacets: T.object,
	},

	getDefaultProps: function () {
		return {
			selectedFacets: {},
		}
	},

	getInitialState: function () {
		return {
			openFacetGroups: [],
		}
	},

	determineFacetType: function (name) {
		if (!this.props.facetTypes || !this.props.facetTypes[name])
			return 'list'

		return this.props.facetTypes[name]
	},

	getSelectedFacets: function (name) {
		return this.props.selectedFacets[name] || []
	},

	handleRemove: function (name, facet) {
		this.props.onRemove(name, facet)
	},

	handleSelect: function (name, facet) {
		this.props.onSelect(name, facet)
	},

	handleToggle: function (name, open) {
		if (open) {
			this.setState({
				openFacetGroups: this.state.openFacetGroups.concat(name)
			})
		} else {
			this.setState({
				openFacetGroups: this.state.openFacetGroups.filter(f => f !== name)
			})
		}
	},

	isFacetOpen: function (name) {
		return this.state.openFacetGroups.indexOf(name) > -1
	},

	renderFacetPanel: function (facet, index) {
		const name = facet.name
		const isOpen = this.isFacetOpen(name)

		return (
			<FacetPanel
				{...facet}
				key={facet.name + index}
				type={this.determineFacetType(name)}
				onRemove={this.props.onRemoveFacet.bind(null, name)}
				onSelect={this.props.onSelectFacet.bind(null, name)}
				onToggle={this.handleToggle.bind(null, name)}
				open={isOpen}
				selectedFacets={this.getSelectedFacets(name)}
			/>
		)
	},

	render: function () {
		return (
			<div>
				{this.props.facets.map(this.renderFacetPanel)}
			</div>
		)
	}
})

export default FacetGroup
