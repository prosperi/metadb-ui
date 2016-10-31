import React from 'react'
import assign from 'object-assign'

const T = React.PropTypes

const DateInput = React.createClass({
	propTypes: {
		onChange: T.func,

		style: T.object, 

		// expect ISO timestamp
		value: T.string,
	},

	getInitialState: function () {
		const value = this.props.value

		if (!value)
			return { date: null }

		// `time` will either be `HH:MM:SS.000Z` 
		// or undefined (if short date (YYYY-MM-DD) is passed)
		const [date, time] = value.split('T')

		return { date }
	},

	getDateValue: function () {
		if (!this.state.date)
			return null

		const values = this.state.date.split('-').map(Number)

		// months are 0-indexed
		if (values[1] > 0)
			values[1] = values[1] - 1

		return new (Function.prototype.bind.apply(Date, [null].concat(values)))
	},

	handleBlur: function () {
		if (!this.props.onChange)
			return

		this.props.onChange && this.props.onChange.call(null, 
			this.getDateValue(), this.state.date
		)
	},

	render: function () {
		const props = {
			onBlur: this.handleBlur,
			onChange: (ev) => this.setState({date: ev.target.value}),

			style: assign({
				display: 'inline-block',
			}, this.props.style),

			type: 'date',
		}

		return React.createElement('input', props)
	}
})

export default DateInput
