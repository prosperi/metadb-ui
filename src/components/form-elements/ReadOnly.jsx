import React from 'react'

const T = React.PropTypes

const ReadOnly = React.createClass({
	propTypes: {
		value: T.any,
	},

	getDefaultProps: function () {
		return { 
			value: '',
		}
	},

	render: function () {
		return <div>{this.props.value}</div>		
	}
})
