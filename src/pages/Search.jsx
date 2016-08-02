import React from 'react'
import qs from 'querystring'
import assign from 'object-assign'

import {history} from '../store'

import SearchForm from '../components/SearchForm.jsx'

const Search = React.createClass({
	componentWillMount: function () {
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
		const collections = [
			{name: 'Firstie Collection', id: 'first-collection'},
			{name: 'Test Collection', id: 'test-collection'},
			{name: 'East Asia Postcard Collection', id: 'eapc'},
		]

		const fields = [
			'coverage.location.sender',
			'coverage.location.recipient',
			'coverage.location.producer',
			'coverage.location.postmark',
			'date.period',
			'title.french',
			'title.german',
			'subject.theme',
			'description.critical',
			'description.text.french',
			'description.text.german',
			'description.inscription.french',
			'description.inscription.german',
			'date.image',
			'subject.ocm',
			'coverage.location.image',
			'date.postmark'
		]

		return (
			<SearchForm
				collections={collections}
				fields={fields}
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
