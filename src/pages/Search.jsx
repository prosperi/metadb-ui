import React from 'react'
import qs from 'querystring'
import assign from 'object-assign'

import {history} from '../store'
import SearchForm from '../components/SearchForm.jsx'

import {SEARCH_FIELDS} from '../actions/constants'

const Search = React.createClass({
	componentWillMount: function () {
		this.props.fetchAllCollections()
		this.props.fetchVocabulary(SEARCH_FIELDS)

		const search = location.search
		this.parsedQuery = null

		if (!search) return

		this.parsedQuery = qs.parse(search.replace(/^\?/, ''))
	},


	handleSearch: function (searchObj) {
		const search = assign({}, location, {
			search: `?${qs.stringify(searchObj)}`
		})

		history.push(search)
	},

	renderResults: function () {
		return (
			<div>
				<h2>results for <pre>{this.parsedQuery.query}</pre></h2>
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
			/>
		)
	},

	render: function () {
		return (
			<div>
				<h1>Search!</h1>
				{this.parsedQuery ? this.renderResults() : this.renderSearchForm()}
			</div>
		)
	}
})

export default Search
