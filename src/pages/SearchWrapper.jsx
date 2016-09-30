// we'll use this as a thin-wrapper to determine which view to use:
// a) no search query in the url? SearchForm (tbd)
// b) has a search query? SearchWithResults
import React from 'react'
import Modal from 'react-modal'
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

	maybeRenderLoadingModal: function () {
		const open = this.props.search.isSearching ? true : false

		const styles = {
			overlay: {
				backgroundColor: 'rgba(0, 0, 0, .5)',
			},
			content: {
				bottom: '75%',
				left: '25%',
				right: '25%',
				top: '15%',
			},
			header: {
				margin: '0',
			}
		}

		return (
			<Modal isOpen={open} style={styles}>
				<h1 style={styles.header}>Searching... </h1>
			</Modal>
		)
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

	renderFacetSidebar: function () {
		if (!this.props.search.facets)
			return

		return (
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
		)
	},

	renderResultsHeader: function () {
		if (!this.state.pages)
			return

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
		if (!this.state.results)
			return 

		const styles = {
			container: {
				marginTop: '10px',
			},

			itemContainer: {
				backgroundColor: '#fff',
				border: '1px solid #1d5f83',
				borderRadius: '2px',
				margin: '10px 0',
				padding: '25px 10px 10px',
				position: 'relative',
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
				marginBottom: '10px',
			},

			author: {
				color: '#666',
				marginTop: '5px',
			},

			format: {

			},

			number: {
				backgroundColor: '#1d5f83',
				borderTopLeftRadius: '1px',
				borderBottomRightRadius: '2px',
				color: '#fff',
				fontSize: '12px',
				left: '0',
				padding: '2px 4px',
				position: 'absolute',
				top: '0',
			}
		}

		const kids = this.state.results.map((item, index) => {
			const number = this.state.pages.offset_value + 1 + index
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

					<div style={styles.number}>{number}</div>
				</div>
			)
		})

		return <div style={styles.container}>{kids}</div>
	},

	toggleResultsView: function (val) {
		this.setState({resultsView: val})
	},

	render: function () {
		if (!this.state.results) {
			return (
				<div>
					{this.maybeRenderLoadingModal()}
					<h1>search</h1>
					<form onSubmit={this.handleSearchSubmit}>
						<input name="query" type="text" />
						<Button style={{display: 'block'}}>search</Button>
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
				{this.maybeRenderLoadingModal()}

				<section key="sidebar" style={styles.sidebar.container}>
					{this.renderFacetSidebar()}
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
