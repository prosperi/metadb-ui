import React from 'react'
import assign from 'object-assign'

const T = React.PropTypes

const TextInputField = React.createClass({
	propTypes: {
		largerField: T.bool,
		placeholder: T.string,
		style: T.object,
		value: T.oneOfType([T.string, T.array]),
		inputOpts: T.object
	},

	getDefaultProps: function () {
		return {
			largerField: false,
			placeholder: '',
			style: {},
			value: '',
		}
	},

	getSingleValue: function () {
		const value = this.props.value
		return Array.isArray(value) ? value[0] : value
	},

	handleBlur: function (ev) {
		const val = ev.target.value

		if (this._initialValue === val) return

		this.props.onChange.call(null, val)
	},

	handleFocus: function (ev) {
		this._initialValue = ev.target.value
	},

	renderInput: function (opts) {
		const props = assign({}, opts, {
			type: 'text'
		}, this.props.inputOpts)

		return React.createElement('input', props)
	},

	renderTextbox: function (opts) {
		const props = assign({}, opts, this.props.inputOpts)

		return React.createElement('textarea', props)
	},

	render: function () {
		const opts = {
			defaultValue: this.getSingleValue(),
			onBlur: this.handleBlur,
			onFocus: this.handleFocus,
			placeholder: this.props.placeholder,
		}

		return (
			this.props.largerField ? this.renderTextbox(opts) : this.renderInput(opts)
		)
	}
})

export default TextInputField
