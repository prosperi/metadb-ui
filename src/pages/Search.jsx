import React from 'react'
import assign from 'object-assign'
import qs from 'querystring'

import {history} from '../store'
import SearchForm from '../components/SearchForm.jsx'
import SearchResultsTable from '../components/SearchResultsTable.jsx'

import {SEARCH_FIELDS} from '../actions/constants'

const Search = React.createClass({
	componentWillMount: function () {
		this.props.fetchAllCollections()
		this.props.fetchVocabulary(SEARCH_FIELDS)

		const search = location.search

		if (!search) return

		this.props.searchWorks(search)
	},

	componentWillUpdate: function (nextProps) {
		const searchQs = nextProps.search.queryString
		const fetching = nextProps.search.isFetching
		
		if (!location.search) return

		if (location.search !== searchQs && !fetching) {
			this.props.searchWorks(location.search)
		}
	},

	fetching: function () {
		return (
			<div className="alert-searching">Searching...</div>
		)
	},

	handleSearch: function (searchObj) {
		const qstring = `?${qs.stringify(searchObj)}`

		const search = assign({}, location, {
			search: qstring
		})

		history.push(search)
		this.props.searchWorks(qstring)
	},

	renderResults: function () {
		return (
			<div>
				<h2 className="search-results-header">
					Displaying results for
					<pre>{this.props.search.query.terms}</pre>
				</h2>
				<SearchResultsTable data={this.props.search.results} />
			</div>
		)
	},

	renderSearchForm: function () {
		const vals = location.search ? this.props.search.query : {}
		return (
			<SearchForm
				collections={this.props.collections}
				fields={this.props.vocabulary[SEARCH_FIELDS]}
				onSubmit={this.handleSearch}
				currentCollectionId={this.props.collection.data.name}
				values={vals}
			/>
		)
	},

	render: function () {
		const displayResults = this.props.search.results && location.search
		const isFetching = this.props.search.isFetching

		return (
			<div>
				<h1>Search!</h1>
				{this.renderSearchForm()}
				{
					displayResults
					? this.renderResults()
					: isFetching
						? this.fetching()
						: ''
				}
			</div>
		)
	}
})

export default Search
