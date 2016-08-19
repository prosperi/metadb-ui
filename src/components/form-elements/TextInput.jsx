import React from 'react'

const T = React.PropTypes

const TextInput = React.createClass({
	propTypes: {
		inputProps: T.object,
		onChange: T.func,
		type: T.string,
		value: T.string,
	},

	getDefaultProps: function () {
		return {
			type: 'text',
		}
	},

	handleBlur: function (ev) {
		const val = ev.target.value

		if (this._initVal === val) return

		this.props.onChange && this.props.onChange.call(null, val)
	},

	handleFocus: function (ev) {
		this._initVal = ev.target.value
	},

	render: function () {
		return (
			<input
				{...this.props.inputProps}
				
				onBlur={this.handleBlur}
				onFocus={this.handleFocus}
				type={this.props.type}
				defaultValue={this.props.value}
			/>
		)
	}
})

export default TextInput
