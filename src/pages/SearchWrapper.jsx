// we'll use this as a thin-wrapper to determine which view to use:
// a) no search query in the url? SearchForm (tbd)
// b) has a search query? SearchWithResults
import React from 'react'
import SearchWithResults from './SearchWithResults.jsx'

const SearchWrapper = React.createClass({
	hasSearchQuery: function () {
		return !!this.props.location.search
	},

	render: function () {
		if (this.hasSearchQuery())
			return <SearchWithResults {...this.props} />

		return <h1>searchin</h1>
	}
})

export default SearchWrapper
