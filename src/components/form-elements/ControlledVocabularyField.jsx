'use strict'

// required Autocomplete props
// - getItemValue
// - renderItem
// _needed_ Autocomplete props
// - onChange
// - value

import React from 'react'
import Autocomplete from 'react-autocomplete'
import assign from 'object-assign'

const T = React.PropTypes

const ControlledVocabularyField = React.createClass({
	propTypes: {
		// props shared w/ TextInput
		placeholder: T.string,
		value: T.any,

		// unique ControlledVocabulary props
		vocabulary: T.array,

		// stylin / profilin
		className: T.string,
		style: T.object,

		hoverHighlightedColor: T.string,
		selectedItemColor: T.string,
	},

	getDefaultProps: function () {
		return {
			placeholder: '',
			value: '',
			vocabulary: [],

			// styles
			className: '',
			style: {},
			hoverHighlightedColor: '#f7539c',
			selectedItemColor: '#f42069',
		}
	},

	getAutocompleteProps: function () {
		const menuStyle = {
			backgroundColor: '#fff',
		  borderRadius: '3px',
		  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
		  fontFamily: 'inherit',
		  fontSize: '90%',
		  padding: '5px',
		  position: 'fixed',
		  overflow: 'auto',
		  maxHeight: '50%',
		  zIndex: '10',
		}

		const inputStyle = {
			fontSize: '1em',
			padding: '.25em',
			width: 'inherit',
		}

		const renderItem = (item, isHoverHighlighted, _style) => {
			let bgColor

			if (item === this.props.value) {
				bgColor = this.props.selectedItemColor
			} else if (isHoverHighlighted) {
				bgColor = this.props.hoverHighlightedColor
			}

			return <div style={assign(
				{},
				_style,
				{backgroundColor: bgColor, cursor: 'pointer'}
			)}>{item}</div>
		}
		
		return {
			getItemValue: (v) => v,
			inputProps: {
				placeholder: this.props.placeholder,
				style: inputStyle,
				type: 'text',
			},
			items: this.props.vocabulary,
			menuStyle,
			onChange: this.handleChange,
			onSelect: this.handleSelect,
			renderItem,
			value: this.props.value,
			wrapperProps: {
				className: 'controlled-vocabulary',
			},
		}
	},

	handleChange: function (ev) {
		this.props.onChange.call(null, ev.target.value)
	},

	handleSelect: function (value) {
		this.props.onChange.call(null, value)
	},

	render: function () {
		return <Autocomplete {...this.getAutocompleteProps()}/>
	}
})

export default ControlledVocabularyField
