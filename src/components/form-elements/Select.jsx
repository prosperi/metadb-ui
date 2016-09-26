import React from 'react'
import assign from 'object-assign'

const T = React.PropTypes

const Select = React.createClass({
	defaultStyle: function () {
		const arrowSvg = [
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 30">',
			'<path d="M5,10L10,20L15,10" stroke="%23000" stroke-width="2"/>',
		'</svg>'].join('')

		return {
			appearance: 'none',
			backgroundColor: 'transparent',
			backgroundImage: 'url(\'data:image/svg+xml;utf8,' + arrowSvg + '\')',
			backgroundRepeat: 'no-repeat',
			backgroundPositionX: '125%',
			backgroundPositionY: 'bottom',
			backgroundSize: 'contain',
			borderRadius: '2px',
			display: 'inline-block',
			fontSize: '1em',
			MozAppearance: 'none',
			padding: '5px',
			paddingRight: '20px',
			verticalAlign: 'middle',
			WebkitAppearance: 'none',
		}
	},

	handleChange: function (ev) {
		this.props.onChange && this.props.onChange.call(null, ev.target.value)
	},

	mapOptions: function () {
		if (!this.props.options || !this.props.options.length)
			return
		
		return this.props.options.map((val, index) => (
			<option key={'sel'+index+(val||'empty')}>{val}</option>
		))
	},

	render: function () {
		const style = assign({}, this.defaultStyle(), this.props.style)
		const props = assign({}, this.props, {style})

		return React.createElement('select', props, [
			this.props.children,
			this.mapOptions(),
		])
	}
})

export default Select
