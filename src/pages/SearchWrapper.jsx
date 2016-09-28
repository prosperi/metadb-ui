// we'll use this as a thin-wrapper to determine which view to use:
// a) no search query in the url? SearchForm (tbd)
// b) has a search query? SearchWithResults
import React from 'react'
import SearchWithResults from './SearchWithResults.jsx'
import Button from '../components/Button.jsx'

import SearchFacetSidebar from '../components/catalog/SearchFacetSidebar.jsx'

const SearchWrapper = React.createClass({
	componentWillMount: function () {
		const qs = this.props.location.search

		if (qs && !this.props.search.query)
			this.props.searchCatalogByQueryString(qs).then(this.handleSearchResponse)
	},

	getInitialState: function () {
		return {

		}
	},

	getFacetSchema: function () {
		return {
			format_main_ssim: {
				type: 'list',
			},
			pub_year_tisim: {
				type: 'list-view-more',
			},
			language: {
				type: 'list-view-more',
			},
		}
	},

	handleSearchResponse: function (res) {
		this.setState({
			results: res.response.docs,
			facets: res.response.facets,
			options: this.props.search.options,
		})
	},

	handleSearchSubmit: function (ev) {
		ev.preventDefault()
		const query = ev.target.elements.query.value

		this.props.searchCatalog(query).then(this.handleSearchResponse)
		.catch(err => {
			console.warn('got a search error', err)
		})
	},

	handleSubmitSearchQuery: function (query) {
		this.props.searchCatalog(query)
	},

	hasSearchQuery: function () {
		return !!this.props.location.search
	},

	onRemoveFacet: function (key, facet) {
		this.props.toggleSearchFacet(key, facet, false)
	},

	onSelectFacet: function (key, facet) {
		this.props.toggleSearchFacet(key, facet, true)
	},

	render: function () {
		if (this.props.search.isSearching) {
			return <div><h1>{"I'M SEARCHIN HERE"}</h1></div>
		}

		if (!this.state.results) {
			return (
				<div>
					<h1>searchin</h1>
					<form onSubmit={this.handleSearchSubmit}>
						<input name="query" type="text" />
						<Button>search</Button>
					</form>
				</div>
			)
		}

		return (
			<div>
				<SearchFacetSidebar
					defaultFacetType="list-view-more"
					facets={this.state.facets}
					facetSchema={this.getFacetSchema()}
					onRemoveSelectedFacet={this.onRemoveFacet}
					onSelectFacet={this.onSelectFacet}
					onSubmitSearchQuery={this.handleSubmitSearchQuery}
					query={this.props.search.query}
					selectedFacets={this.props.search.facets}
				/>
			</div>
		)
	}
})

export default SearchWrapper
