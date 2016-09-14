import React from 'react'

const T = React.PropTypes

const TextArea = React.createClass({
	propTypes: {
		disabled: T.bool,
		placeholder: T.string,
		readOnly: T.bool,
		required: T.bool,
		style: T.object,
		value: T.string,

		onChange: T.func,
	},

	getDefaultProps: function () {
		return {
			disabled: false,
			placeholder: '',
			readOnly: false,
			required: false,
			style: {},
			value: '',
		}
	},

	handleBlur: function (ev) {
		const val = ev.target.value
		const check = this._initalValue ? this._initialValue : this.props.value

		if (this.props.disabled || this.props.readOnly || check === val)
			return

		this.props.onChange && this.props.onChange.call(null, val)
	},

	handleFocus: function (ev) {
		this._initialValue = ev.target.value
	},

	render: function () {
		const props = {
			defaultValue: this.props.value,
			disabled: this.props.disabled,
			onBlur: this.handleBlur,
			onFocus: this.handleFocus,
			placeholder: this.props.placeholder,
			readOnly: this.props.readOnly,
			required: this.props.required,
			style: this.props.style,
		}


		return React.createElement('textarea', props, this.props.children)
	}
})

export default TextArea
