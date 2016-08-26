import React from 'react'

const T = React.PropTypes

const Select = React.createClass({
	propTypes: {
		className: T.string,
		disabled: T.bool,
		multiple: T.bool,
		size: T.number,
		options: T.array,
		value: T.string,
	},

	getDefaultProps: function () {
		return {
			className: '',
			disabled: false,
			multiple: false,
			size: 0,
			options: [],
			value: '',
		}
	},

	handleChange: function (ev) {
		this.props.onChange && this.props.onChange.call(null, ev.target.value)
	},

	mapOptions: function () {
		return this.props.options.map((val, index) => (
			<option key={'sel'+index+(val||'empty')}>{val}</option>
		))
	},

	render: function () {
		return (
			<select
				className={this.props.className}
				disabled={this.props.disabled}
				multiple={this.props.multiple}
				size={this.props.size}
				value={this.props.value}

				onChange={this.handleChange}
			>
				{this.props.children}
				{this.mapOptions()}
			</select>
		)
	}
})

export default Select
