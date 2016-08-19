import React from 'react'

const T = React.PropTypes

const TextArea = React.createClass({
	propTypes: {
		disabled: T.bool,
		inputProps: T.object,
		onChange: T.func,
		readOnly: T.bool,
		value: T.string,
	},

	handleBlur: function (ev) {
		const val = ev.target.value
		if (this._initialValue === val)
			return

		this.props.onChange && this.props.onChange.call(null, val)
	},

	handleFocus: function (ev) {
		this._initialValue = ev.target.value
	},

	render: function () {
		return (
			<textarea
				{...this.props.inputProps}

				defaultValue={this.props.value}
				onBlur={this.handleBlur}
				onFocus={this.handleFocus}
			/>
		)
	}
})

export default TextArea
