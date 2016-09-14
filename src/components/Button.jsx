import React from 'react'
import assign from 'object-assign'

const T = React.PropTypes

const Button = React.createClass({
	propTypes: {
		onClick: T.func,
		size: T.string,
		style: T.object,
		type: T.string,
	},

	componentWillMount: function () {
		document.addEventListener('mouseup', this.handleMouseUp)
	},

	componentWillUnmount: function () {
		document.removeEventListener('mouseup', this.handleMouseUp)
	},

	getInitialState: function () {
		return {
			mousedown: false,
		}
	},

	getSizeStyle: function () {
		switch (this.props.size) {
			case 'large':
				return {
					fontSize: '16px',
					padding: '8px',
				}

			case 'small':
				return {
					fontSize: '12px',
					padding: '2px',
				}

			default:
				return {
					fontSize: '14px',
					padding: '4px 6px',
				}
		}
	},

	getTypeStyle: function () {
		switch (this.props.type) {
			default:
				return {
					normal: {
						backgroundColor: '#dedede',
						color: '#222',
						borderColor: '#999'
					},
					mousedown: {
						backgroundColor: '#cdcdcd',
						color: '#222',
					}
				}
		}
	},

	handleMouseDown: function (ev) {
		this.setState({mousedown: true})
		this.props.onMouseDown && this.props.onMouseDown(ev)
	},

	handleMouseUp: function (ev) {
		if (this.state.mousedown) {
			this.setState({mousedown: false})
			this.props.onMouseUp && this.props.onMouseUp(ev)
		}
	},

	render: function () {
		const thisProps = assign({}, this.props)
		
		// we call onMouseDown/Up from within our own mouse handlers
		// so removing these prevents conflicts
		if (thisProps.onMouseDown) delete thisProps.onMouseDown
		if (thisProps.onMouseUp) delete thisProps.onMouseUp

		const baseStyle = {
			boxShadow: 'none',
			borderRadius: '2px',
			borderStyle: 'solid',
			borderWidth: '1px',
			cursor: 'pointer',
			lineHeight: '1.5em',
			outline: 'none',
		}

		const typeStyle = this.getTypeStyle()

		const style = assign({}, 
			baseStyle, 
			this.getSizeStyle(),
			(this.state.mousedown ? typeStyle.mousedown : typeStyle.normal),
			this.props.style
		)

		const props = assign({}, {
			onMouseDown: this.handleMouseDown,
			onMouseUp: this.handleMouseUp,
			style,
		}, thisProps)

		return React.createElement('button', props)
	}
})

export default Button
