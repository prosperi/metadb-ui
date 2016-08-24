import React from 'react'

const T = React.PropTypes

const TextInput = React.createClass({
	propTypes: {
		disabled: T.bool,
		placeholder: T.string,
		readOnly: T.bool,
		required: T.bool,
		type: T.string,
		value: T.string,

		onChange: T.func,
	},

	getDefaultProps: function () {
		return {
			disabled: false,
			placeholder: '',
			readOnly: false,
			required: false,
			type: 'text',
			value: '',
		}
	},

	handleBlur: function (ev) {
		const val = ev.target.value
		const check = this._initialValue ? this._initialValue : this.props.value

		if (this.props.disabled || this.props.readOnly || check === val)
			return

		this.props.onChange && this.props.onChange.call(null, val)
	},

	handleFocus: function (ev) {
		this._initialValue = ev.target.value
	},

	render: function () {
		return (
			<input
				disabled={this.props.disabled}
				placeholder={this.props.placeholder}
				readOnly={this.props.readOnly}
				required={this.props.required}
				type={this.props.type}

				defaultValue={this.props.value}
				onBlur={this.handleBlur}
				onFocus={this.handleFocus}
			/>
		)
	}
})

export default TextInput
