import React from 'react'
import { darken } from '../../../lib/colors'
const T = React.PropTypes

const SelectedFacetsList = React.createClass({
	propTypes: {
		onRemove: T.func.isRequired,
		facets: T.array.isRequired,
		color: T.string,
	},

	getDefaultProps: function () {
		return {
			color: '#d8ecd8',
		}
	},

	getInitialState: function () {
		return {
			xHoverIdx: -1,
		}
	},

	handleRemove: function (facet, ev) {
		ev.preventDefault()
		this.props.onRemove(facet)
	},

	renderListItem: function (facet, index) {
		const hovering = this.state.xHoverIdx === index

		const buttonStyle = {
			WebkitAppearance: 'none',
			MozAppearance: 'none',
			MSAppearance: 'none',
			appearance: 'none',
			backgroundColor: 'transparent',
			border: 'none',
			color: hovering ? '#b26464' : '#222',
			cursor: 'pointer',
			fontSize: '1em',
			fontWeight: 'bold',
			marginLeft: '5px',
			outline: 'none',
			verticalAlign: 'middle',
		}

		const itemStyle = {
			textDecoration: hovering ? 'line-through' : 'none'
		}

		return (
			<li style={itemStyle} key={facet.value + index}>
				{facet.label}
				<button 
					onClick={this.handleRemove.bind(null, facet)}
					onMouseOut={this.resetHoverIndex}
					onMouseOver={this.setHoverIndex.bind(null, index)}
					style={buttonStyle}
				>
					X
				</button>
			</li>
		)
	},

	resetHoverIndex: function () {
		return this.setHoverIndex(-1)
	},

	setHoverIndex: function (xHoverIdx) {
		this.setState({xHoverIdx})
	},

	render: function () {
		if (!this.props.facets.length)
			return null

		const containerColor = this.props.color

		const styles = {
			container: {
				backgroundColor: containerColor,
				borderColor: darken(containerColor, 10),
				borderStyle: 'solid',
				borderRadius: '2px',
				borderWidth: '2px',
				padding: '5px',
			},
			list: {
				listStyleType: 'none',
				margin: '0',
				padding: '0',
			},
		}

		return (
			<div style={styles.container}>
				<ul style={styles.list}>
					{this.props.facets.map(this.renderListItem)}
				</ul>
			</div>
		)
	}
})

export default SelectedFacetsList
