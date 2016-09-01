import React from 'react'
import Autocomplete from 'react-autocomplete'
import assign from 'object-assign'

const T = React.PropTypes

const ControlledVocabularyInput = React.createClass({
	propTypes: {
		onChange: T.func,
		vocabulary: T.array,
	},

	getDefaultProps: function () {
		return {
			vocabulary: [],
		}
	},

	getInitialState: function () {
		return {
			value: this.props.value || '',
		}
	},

	getItemValue: function (item) {
		return item
	},

	handleChange: function (ev, value) {
		this.setState({
			value: value,
		})
	},

	handleSelect: function (value, item) {
		this.props.onChange && this.props.onChange.call(null, value)
	},

	renderItem: function (item, isHighlighted, style) {
		const itemStyle = {
			backgroundColor: isHighlighted ? '#f42069' : 'inherit',
			cursor: 'pointer',
			padding: '.25em',
		}

		return (
			<div style={itemStyle}>{item}</div>
		)
	},

	renderMenu: function (items, value, style) {
		const menuStyle = {
			borderRadius: '2px',
			boxShadow: '0 2px 12px #aaa',
			background: '#fff',
			fontSize: '90%',
			height: '10em',
			left: '0',
			overflowY: 'scroll',
			padding: '4px',
			position: 'absolute',
			top: '2.5em',
			width: '100%',
			zIndex: '10',
		}

		return (
			<div style={menuStyle} children={items} />
		)
	},

	render: function () {
		const wrapperStyle = {
			clear: 'both',
			float: 'left',
			position: 'relative',
			verticalAlign: 'middle',
			width: '90%',
		}

		const inputProps = {
			style: {
				width: '100%',
			},

			type: 'text'
		}

		return (
			<Autocomplete
				inputProps={inputProps}
				items={this.props.vocabulary}
				getItemValue={this.getItemValue}
				onChange={this.handleChange}
				onSelect={this.handleSelect}
				renderItem={this.renderItem}
				renderMenu={this.renderMenu}
				value={this.state.value}
				wrapperStyle={wrapperStyle}
			/>
		)
	}
})

export default ControlledVocabularyInput
