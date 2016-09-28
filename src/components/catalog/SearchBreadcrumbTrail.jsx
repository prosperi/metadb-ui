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

		const props = {
			onRemove: this.props.onRemoveBreadcrumb.bind(null, facet),
		}

		return React.createElement(SearchBreadcrumb, props)
	},

	render: function () {
		if (!this.props.facets)
			return null

		const keys = Object.keys(this.props.facets)

		if (!keys.length)
			return null

		return (
			<div>
				<SearchBreadcrumb
					key={'query'}
					onRemove={this.props.onRemoveBreadcrumb.bind(null, 'q', this.props.query)}
					value={this.props.query}
				/>
				{keys.map(this.renderGroupBreadcrumbs)}
			</div>
		)
	}
})

export default SearchBreadcrumbTrail
