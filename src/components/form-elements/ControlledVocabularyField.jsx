'use strict'

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
		fetchVocabulary: T.func.isRequired,
		vocabulary: T.object,

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

		const renderMenu = (items, value, style) => {
			if (!this.state.terms) {
				if (!this.state.loading) {
					this.props.fetchVocabulary()
				}

				return (
					<div style={{...style, ...menuStyle}}>
						Loading...
					</div>
				)
			}

			return (
				<div style={{...style, ...menuStyle}} children={this.props.terms}/>
			)
		}
		
		return {
			getItemValue: (v) => v,
			inputProps: {
				onFocus: this.handleFocus,
				placeholder: this.props.placeholder,
				style: inputStyle,
				type: 'text',
			},
			items: this.state.terms || [],
			menuStyle,
			onChange: this.handleChange,
			onSelect: this.handleSelect,
			renderItem,
			renderMenu,
			value: this.props.value,
			wrapperProps: {
				className: 'controlled-vocabulary',
				onClick: this.handleClick,
			},
		}
	},

	handleChange: function (ev) {
		this.props.onChange.call(null, ev.target.value)
	},

	handleClick: function (ev) {
		// this is only for when the input is focused
		if (ev.target.nodeName !== 'INPUT') return

		this.props.fetchVocabulary()
	},

	handleSelect: function (value) {
		this.props.onChange.call(null, value)
	},

	render: function () {
		// return (
		// 	<Autocomplete
		// 		getItemValue={v => v.label}
		// 	/>
		// )
		// return <Autocomplete {...this.getAutocompleteProps()}/>
		return (
			<div className="controlled-vocabulary">
				<input type="text" value={this.props.value} disabled />
			</div>
		)
	}
})

export default ControlledVocabularyField
