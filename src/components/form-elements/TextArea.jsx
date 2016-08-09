import React from 'react'
import assign from 'object-assign'

import BaseInputComponent from './BaseInputComponent.jsx'

const T = React.PropTypes

export default class TextArea extends BaseInputComponent {
	constructor (props) {
		super(props)
	}

	render () {
		const props = assign({}, {
			defaultValue: this.props.value || '',
			onBlur: this.handleBlur,
			onFocus: this.handleFocus,
		}, this.props.inputProps)

		return (
			<textarea
				defaultValue={this.props.value || ''}
				onBlur={this.handleBlur}
				onFocus={this.handleFocus}

				{...this.props.inputProps} 
			/>
		)
	}
}

TextArea.propTypes = {
	value: T.string,
	onChange: T.func,
}
