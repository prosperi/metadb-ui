import React from 'react'
import assign from 'object-assign'
import BaseInputComponent from './BaseInputComponent.jsx'

const T = React.PropTypes

export default class TextInput extends React.Component {
	constructor (props) {
		super(props)
	}

	render() {
		return (
			<input
				defaultValue={this.props.value || ''}
				onBlur={this.handleBlur}
				onFocus={this.handleFocus}
				type="text"

				{...this.props.inputProps}
			/>
		)
	}
}

TextInput.propTypes = {
	inputProps: T.object,
	onChange: T.func,
	value: T.string,
}
