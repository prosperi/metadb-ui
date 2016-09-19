import React from 'react'

import FacetList from './FacetList.jsx'

const T = React.PropTypes

const FacetPanel = React.createClass({
	propTypes: {
		items: T.array.isRequired,
		label: T.string.isRequired,
		name: T.string.isRequired,
		onChange: T.func.isRequired,
		onToggle: T.func.isRequired,

		selectedValues: T.array,
		type: T.oneOf(['list'])
	},

	getDefaultProps: function () {
		return {
			selectedValues: [],
			type: 'list',
		}
	},

	determinePanelBody: function () {
		switch (this.props.type) {

			case 'list':
				return FacetList
		}
	},

	renderFacetPanelBody: function () {
		if (!this.props.open)
			return

		const FacetPanelBody = this.determinePanelBody()
		
		const props = {
			items: this.props.items,
			label: this.props.label,
			name: this.props.name,
			onChange: this.props.onChange,
			selectedValues: this.props.selectedValues,
		}

		return React.createElement(FacetPanelBody, props)
	},

	render: function () {
		return (
			<div className="facet-panel">
				<header onClick={this.props.onToggle}>
					<h3 className="panel-title">{this.props.label}</h3>
				</header>

				{this.renderFacetPanelBody()}
			</div>
		)
	}
})

export default FacetPanel
