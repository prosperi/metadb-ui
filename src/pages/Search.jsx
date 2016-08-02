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
		const style = {
			backgroundColor: '#deedee',
			border: '2px solid #9aa9aa',
			fontSize: '1em',
			padding: '.5em',
		}

		return (
			<div style={style}>Searching...</div>
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
		const preStyles = {
			backgroundColor: '#eee',
			border: '2px solid #ccc',
			display: 'inline-block',
			fontWeight: 'normal',
			padding: '0 .125em',
			marginLeft: '.5em',
		}

		const h2styles = {
			textAlign: 'center',
		}

		return (
			<div>
				<h2 style={h2styles}>Displaying results for 
					<pre style={preStyles}>
						{this.props.search.query.terms}
					</pre>
				</h2>
				<SearchResultsTable data={this.props.search.results} />
			</div>
		)
	},

	renderSearchForm: function () {
		return (
			<SearchForm
				collections={this.props.collections}
				fields={this.props.vocabulary[SEARCH_FIELDS]}
				onSubmit={this.handleSearch}
				currentCollectionId={this.props.collection.data.name}
				values={this.props.search.query}
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
