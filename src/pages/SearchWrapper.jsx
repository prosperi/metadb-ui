// we'll use this as a thin-wrapper to determine which view to use:
// a) no search query in the url? SearchForm (tbd)
// b) has a search query? SearchWithResults
import React from 'react'
import SearchWithResults from './SearchWithResults.jsx'
import Button from '../components/Button.jsx'
import SearchFacetSidebar from '../components/catalog/SearchFacetSidebar.jsx'
import SearchBreadcrumb from '../components/catalog/SearchBreadcrumb.jsx'
import SearchResultsHeader from '../components/catalog/SearchResultsHeader.jsx'

import { getBreadcrumbList } from '../../lib/facet-helpers'

const SearchWrapper = React.createClass({
	componentWillMount: function () {
		const qs = this.props.location.search

		if (qs && !this.props.search.query)
			this.props.searchCatalogByQueryString(qs).then(this.handleSearchResponse)
	},

	getInitialState: function () {
		return {
			resultsView: 'list',
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

	getFacetGroupInfo: function (pool, name) {
		for (let i = 0; i < pool.length; i++)
			if (pool[i].name === name)
				return {
					name: pool[i].name,
					label: pool[i].label
				}

		return null
	},

	handleSearchResponse: function (res) {
		const facets = res.response.facets
		const breadcrumbs = getBreadcrumbList(facets, this.props.search.facets)

		this.setState({
			results: res.response.docs,
			options: this.props.search.options,
			pages: res.response.pages,
			facets,
			breadcrumbs,
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
		this.props.toggleSearchFacet(key, facet, false).then(this.handleSearchResponse)
	},

	onSelectFacet: function (key, facet) {
		this.props.toggleSearchFacet(key, facet, true).then(this.handleSearchResponse)
	},

	renderBreadcrumbs: function () {
		const bc = this.state.breadcrumbs
		const query = this.props.search.query

		const querybc = (
			<SearchBreadcrumb
				key="bc-query"
				onRemove={console.log}
				value={query}
			/>
		)

		const crumbs = bc.map((crumb, index) => {
			const {label, name} = crumb.group
			const facet = crumb.facet

			const props = {
				key: 'bc' + index + facet.value,
				group: label,
				value: facet.label,
				onRemove: this.onRemoveFacet.bind(null, name, facet)
			}

			return React.createElement(SearchBreadcrumb, props)
		})

		const style = {
			backgroundColor: '#fafafa',
			marginBottom: '10px',
			marginTop: '-5px',
		}

		return (
			<div key="bc-trail" style={style}>
				{[].concat(querybc, crumbs)}
			</div>
		)
	},

	renderResultsHeader: function () {
		const props = {
			pageData: this.state.pages,
			onNextPage: console.log,
			onPreviousPage: console.log,
			onOpenToolModal: console.log,
			onPerPageChange: console.log,
			onViewChange: this.toggleResultsView,
			view: this.state.resultsView,
			viewOptions: ['list', 'gallery'],
		}

		return React.createElement(SearchResultsHeader, props)
	},

	toggleResultsView: function (val) {
		this.setState({resultsView: val})
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

		const styles = {
			sidebar: {
				container: {
					display: 'inline-block',
					verticalAlign: 'top',
					width: '22.5%',
				}
			},
			results: {
				container: {
					display: 'inline-block',
					padding: '5px',
					verticalAlign: 'top',
					width: '77.5%',
				}
			}
		}

		return (
			<div>
				<section key="sidebar" style={styles.sidebar.container}>
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
				</section>

				<section key="results" style={styles.results.container}>
					{this.renderBreadcrumbs()}
					{this.renderResultsHeader()}
				</section>
			</div>
		)
	}
})

export default SearchWrapper
