import React from 'react'

const T = React.PropTypes

const FacetPanel = React.createClass({
	propTypes: {
		label: T.string.isRequired,
		name: T.string.isRequired,
		items: T.array.isRequired,

		selectedItems: T.array,

		type: T.oneOf(['list'])
	},

	getDefaultProps: function () {
		return {
			selectedItems: [],
		}
	},

	renderFacetPanelBody: function () {

	},

	render: function () {
		<div className="facet-panel">
			<header>
				<h3 className="panel-title">{this.props.label}</h3>
			</header>

			{this.renderFacetPanelBody()}
		</div>
	}
})

export default FacetPanel
