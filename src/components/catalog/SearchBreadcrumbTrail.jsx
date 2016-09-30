import React from 'react'
import SearchBreadcrumb from './SearchBreadcrumb.jsx'

const T = React.PropTypes

const SearchBreadcrumbTrail = React.createClass({
	propTypes: {
		onRemoveBreadcrumb: T.func.isRequired,
		
		facets: T.object,
		query: T.string,
	},

	renderGroupBreadcrumbs: function (key) {
		const group = this.props.facets[key]

		return group.map((facet, index) => {
			const props = {
				key: key + index + facet.value,
				group: key,
				value: facet.label,
				onRemove: this.props.onRemoveBreadcrumb.bind(null, key, facet),
			}

			return React.createElement(SearchBreadcrumb, props)
		})
	},

	renderQuery: function () {
		if (!this.props.query || this.props.query === '')
			return

		return (
			<SearchBreadcrumb
				key={'query'}
				onRemove={this.props.onRemoveBreadcrumb.bind(null, 'q', this.props.query)}
				value={'"' + this.props.query + '"'}
			/>
		)
	},

	render: function () {
		if (!this.props.facets)
			return null

		const keys = Object.keys(this.props.facets)

		if (!keys.length)
			return null

		return (
			<div>
				{this.renderQuery()}

				{keys.map(this.renderGroupBreadcrumbs)}
			</div>
		)
	}
})

export default SearchBreadcrumbTrail
