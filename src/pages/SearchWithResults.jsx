import React from 'react'
import assign from 'object-assign'
import SearchFacetSidebar from '../components/catalog/SearchFacetSidebar.jsx'
import SearchResultsHeader from '../components/catalog/SearchResultsHeader.jsx'

const SearchWithResults = React.createClass({
	getInitialState: function () {
		return {
			modals: {
				metadataTools: false,
				viewMoreFilter: false,
			},
		}
	},

	handleToggleFacet: function (checked, key, facet) {
		this.props.toggleFacet(key, facet, checked)
	},

	renderLoading: function () {
		const props = {

		}

		return React.createElement('div', props)
	},

	renderSidebar: function () {
		const props = assign({}, this.props.search, {
			defaultFacetType: 'list-view-more',
			onRemoveSelectedFacet: this.handleToggleFacet.bind(null, false),
			onSelectFacet: this.handleToggleFacet.bind(null, true),
			onSubmitSearchQuery: console.log,
		})

		return React.createElement(SearchFacetSidebar, props)
	},

	render: function () {
		// if (this.props.search.isSearching)
		// 	return this.renderLoading()

		// const facets = this.props.search.facets || []
		// const results = this.props.search.results || []
		return (
			<div>
				{this.renderSidebar()}
			</div>
		)
	}
})

export default SearchWithResults
