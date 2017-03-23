import React from 'react'

const DelayedInput = React.createClass({
	getInitialState: function () {
		return {
			value: this.props.value || '',
		}
	},

	componentWillReceiveProps: function (nextProps) {
		if (nextProps.value !== this.state.value) {
			this.setState({value: nextProps.value})
		}
	},

	onBlur: function (ev) {
		this.props.onBlur && this.props.onBlur(ev)
		this.props.onChange && this.props.onChange(this.state.value)
	},

	onChange: function (ev) {
		this.setState({value: ev.target.value})
	},

	render: function () {
		return (
			<input
				{ ...this.props }

				onBlur={this.onBlur}
				onChange={this.onChange}
				value={this.state.value}
			/>
		)
	}
})

export default DelayedInput
