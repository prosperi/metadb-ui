// we'll use this as a thin-wrapper to determine which view to use:
// a) no search query in the url? SearchForm (tbd)
// b) has a search query? SearchWithResults
import React from 'react'
import SearchWithResults from './SearchWithResults.jsx'
import Button from '../components/Button.jsx'
import SearchFacetSidebar from '../components/catalog/SearchFacetSidebar.jsx'
import SearchBreadcrumb from '../components/catalog/SearchBreadcrumb.jsx'
import SearchBreadcrumbTrail from '../components/catalog/SearchBreadcrumbTrail.jsx'
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

	clearSelectedFacets: function (ev) {
		const query = this.props.search.query
		const options = this.props.search.options

		console.log('this.props.search.options', options)

		this.props.searchCatalog(query, {}, this.props.search.options).then(this.handleSearchResponse)
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

	handleNextPage: function () {
		const pages = this.state.pages
		
		if (!pages.next_page)
			return

		this.props.setSearchOption('page', pages.next_page).then(this.handleSearchResponse)
	},

	handlePerPageChange: function (val) {
		this.props.setSearchOption('per_page', val).then(this.handleSearchResponse)
	},

	handlePreviousPage: function () {
		const pages = this.state.pages

		if (!pages.prev_page)
			return

		const prev = pages.prev_page === 1 ? null : pages.prev_page

		this.props.setSearchOption('page', prev).then(this.handleSearchResponse)
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
		this.props.searchCatalog(query, this.props.search.facets, this.props.search.options)
		.then(this.handleSearchResponse)
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

		const querybc = !query ? null : (
			<SearchBreadcrumb
				key="bc-query"
				onRemove={this.handleSubmitSearchQuery}
				value={'"' + query + '"'}
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
			onNextPage: this.handleNextPage,
			onPreviousPage: this.handlePreviousPage,
			onOpenToolModal: console.log,
			onPerPageChange: this.handlePerPageChange,
			onViewChange: this.toggleResultsView,
			perPage: this.props.search.options.per_page,
			view: this.state.resultsView,
			viewOptions: ['list', 'gallery'],
		}

		return React.createElement(SearchResultsHeader, props)
	},

	renderResults: function () {
		const styles = {
			container: {
				marginTop: '10px',
			},

			itemContainer: {
				backgroundColor: '#fff',
				border: '1px solid #aaa',
				borderRadius: '2px',
				margin: '10px 0',
				padding: '10px',
			},

			itemHeader: {
				display: 'block',
				fontSize: '18px',
				fontWeight: 'bold',
			},

			subtitle: {
				display: 'block',
				fontSize: '14px',
				fontStyle: 'italic',
				fontWeight: 'normal',
			},

			author: {
				color: '#666',
				marginTop: '5px',
			},

			format: {

			},
		}

		const kids = this.state.results.map((item, index) => {
			return (
				<div key={'item'+index+item.id} style={styles.itemContainer}>
					<heading style={styles.itemHeader}>
						{item.title_display}
						{
							item.subtitle_display
							? <small style={styles.subtitle}>{item.subtitle_display}</small>
							: null
						}
					</heading>

					{
						item.author_display
						? <p style={styles.author}>{item.author_display}</p>
						: null
					}

					<p style={styles.format}>{item.format}</p>
				</div>
			)
		})

		return <div style={styles.container}>{kids}</div>
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
			container: {
				backgroundColor: '#fafafa',
			},

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
			<div style={styles.container}>
				<section key="sidebar" style={styles.sidebar.container}>
					<SearchFacetSidebar
						defaultFacetType="list-view-more"
						facets={this.state.facets}
						facetSchema={this.getFacetSchema()}
						clearSelectedFacets={this.clearSelectedFacets}
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

					{this.renderResults()}
				</section>
			</div>
		)
	}
})

export default SearchWrapper
