import React from 'react'
import assign from 'object-assign'

const T = React.PropTypes

const TextArea = React.createClass({
	propTypes: {
		inputProps: T.object,
		onChange: T.func,
		value: T.string,
	},

	getDefaultProps: function () {
		return {
			value: '',
		}
	},

	handleBlur: function (ev) {
		const val = ev.target.value
		if (val === this._initialValue) return

		this.props.onChange && this.props.onChange.call(null, val)
	},

	handleFocus: function (ev) {
		this._initialValue = ev.target.value
	},

	render: function () {
		return (
			<textarea
				defaultValue={this.props.value}
				onBlur={this.handleBlur}
				onFocus={this.handleFocus}

				{...this.props.inputProps}
			/>
		)
	}
})

export default TextArea
