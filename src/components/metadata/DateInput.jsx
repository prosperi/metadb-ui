import React from 'react'
import assign from 'object-assign'

const T = React.PropTypes

const DateInput = React.createClass({
	propTypes: {
		onChange: T.func,

		style: T.object,

		type: T.oneOf(['day', 'month', 'year']),

		// expect ISO timestamp
		value: T.string,
	},

	getInitialState: function () {
		let value = this.props.value

		if (!value)
			return { date: '' }

		// `time` will either be `HH:MM:SS.000Z`
		// or undefined (if short date (YYYY-MM-DD) is passed)
		let [ date ] = value.split('T')

		if (this.props.type === 'month')
			date = date.replace(/\-\d{2}$/, '')

		return { date }
	},

	getDateValue: function () {
		if (!this.state.date)
			return null

		const values = this.state.date.split('-').map(Number)

		// months are 0-indexed
		if (values[1] > 0)
			values[1] = values[1] - 1

		return (new Date(Date.UTC.apply(Date, values))).toISOString()
	},

	getInputType: function () {
		switch (this.props.type) {
			case 'month': return 'month'
			default:
				return 'date'
		}
	},

	handleBlur: function () {
		if (!this.props.onChange)
			return

		this.props.onChange && this.props.onChange(this.getDateValue())
	},

	render: function () {
		const props = {
			className: 'DateInput',
			onBlur: this.handleBlur,
			onChange: (ev) => this.setState({date: ev.target.value}),

			style: assign({
				display: 'inline-block',
			}, this.props.style),

			type: this.getInputType(),
			value: this.state.date,
		}

		return <input {...props} />
	}
})

export default DateInput
