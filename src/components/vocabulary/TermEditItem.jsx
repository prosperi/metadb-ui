'use strict'

import React from 'react'
import TermEditFields from './TermEditFields.jsx'

const T = React.PropTypes

const TermEditItem = React.createClass({
	propTypes: {
		displayKey: T.string.isRequired,
		onToggle: T.func.isRequired,
		term: T.object.isRequired,

		onAddValueField: T.func,
		onChange: T.func,
		onRemoveValueField: T.func,

		open: T.bool,
	},

	getDefaultProps: function () {

	},

	handleToggle: function () {
		this.props.onToggle()
	},

	renderTermEditFields: function () {
		if (!this.props.open) return

		return (
			<TermEditFields
				onAddValueField={this.props.onAddValueField}
				onChange={this.props.onChange}
				onRemoveValueField={this.props.onRemoveValueField}
				values={this.props.term}
			/>
		)
	},

	render: function () {
		let classname = 'term'

		if (this.props.open)
			classname += ' open'

		return (
			<div className={classname}>
				<header onClick={this.handleToggle}>
					{this.props.term[this.props.displayKey]}
				</header>

				{this.renderTermEditFields()}
			</div>
		)
	}
})

export default TermEditItem
