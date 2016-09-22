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

		onRemoveSelectedFacet: T.func.isRequired,
		onSelectFacet: T.func.isRequired,

		// if we don't have a schema passed, or, when iterating through, the
		// facet doesn't appear in the schema, which facet-type should we
		// default to?
		// (default: 'list')
		defaultFacetType: T.string,

		// TODO:
		// `facetSchemas` is a map of facet schema info
		// --------
		// {
		// 	"example_facet": {
		// 		type: "list",
		// 		sort: "desc",
		// 		sortField: "hits",
		//		options: {
		//			/* facet-specific opts like limit/step/etc. */
		//		},
		//		hide: false,
		// 	}
		// }
		facetSchemas: T.object,

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
			defaultFacetType: 'list',
			selectedFacets: {},
		}
	},

	getInitialState: function () {
		return {
			openFacetGroups: [],
		}
	},

	determineFacetType: function (name) {
		if (!this.props.facetSchemas || !this.props.facetSchemas[name])
			return this.props.defaultFacetType

		return this.props.facetSchemas[name]
	},

	getSelectedFacets: function (name) {
		return this.props.selectedFacets[name] || []
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

	renderFacetPanel: function (facet, index) {
		const isOpen = this.state.openFacetGroups.indexOf(facet.name) > -1
		const name = facet.name

		return (
			<FacetPanel
				data={facet}
				key={name + index}
				type={this.determineFacetType(name)}
				onRemoveSelectedFacet={this.props.onRemoveSelectedFacet.bind(null, name)}
				onSelectFacet={this.props.onSelectFacet.bind(null, name)}
				open={isOpen}
				selectedFacets={this.getSelectedFacets(name)}
			/>
		)
	},

	render: function () {
		const wrapperStyles = {
			border: '1px solid pink',
			display: 'inline-block',
			width: '33%',
		}

		return (
			<div style={wrapperStyles}>
				{this.props.facets.map(this.renderFacetPanel)}
			</div>
		)
	}
})

export default FacetGroup
