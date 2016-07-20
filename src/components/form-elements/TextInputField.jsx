import React from 'react'

const T = React.PropTypes

const TextInputField = React.createClass({
	propTypes: {
		largerField: T.bool,
		onChange: T.func,
		placeholder: T.string,
		style: T.object,
		value: T.oneOfType([T.string, T.array]),
	},

	getDefaultProps: function () {
		return {
			largerField: false,
			onChange: function () {},
			placeholder: '',
			style: {},
			value: '',
		}
	},

	handleBlur: function (ev) {
		this.props.onChange.call(null, ev.target.value)
	},

	renderInput: function () {
		const value = Array.isArray(this.props.value)
								? this.props.value[0]
								: this.props.value

		return (
			<input
				onBlur={this.handleBlur}
				placeholder={this.props.placeholder}
				type="text" 
				defaultValue={value}
			/>
		)
	},

	renderTextbox: function () {
		const value = Array.isArray(this.props.value)
								? this.props.value[0]
								: this.props.value

		return (
			<textarea 
				onChange={this.handleChange} 
				placeholder={this.props.placeholder}
				defaultValue={this.props.value}
			/>
		)
	},

	render: function () {
		return this.props.largerField ? this.renderTextbox() : this.renderInput()
	}
})

export default TextInputField
