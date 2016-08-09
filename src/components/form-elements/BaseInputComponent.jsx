import React from 'react'

export default class BaseInputComponent extends React.Component {
	onBlur (ev) {
		const val = ev.target.value
		if (this._initialValue === val) return

		return this.props.onChange && this.props.onChange.call(null, val)
	}

	onFocus (ev) {
		this._initialValue = ev.target.value
	}
}
