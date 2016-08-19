'use strict'

import React from 'react'
import FormElementContainer from '../FormElementContainer.jsx'
import TextInput from '../form-elements/TextInput.jsx'

const T = React.PropTypes

const TermEditFields = React.createClass({
	propTypes: {
		onAddValueField: T.func.isRequired,
		onChange: T.func.isRequired,
		onRemoveValueField: T.func.isRequired,
		values: T.object.isRequired,

		hiddenFields: T.arrayOf(T.string),
	},

	getDefaultProps: function () {
		return {
			hiddenFields: [],
		}
	},

	handleAddValueField: function (key) {
		this.props.onAddValueField.call(null, key)
	},

	handleChange: function (key, index, value) {
		this.props.onChange.apply(null, arguments)
	},

	handleRemoveValueField: function (key, index) {
		this.props.onRemoveValueField.call(null, key, index)
	},

	mapValues: function () {
		const terms = this.props.values
		const keys = Object.keys(terms)
		const hidden = this.props.hiddenFields

		return keys.map((key, index) => {
			if (hidden.indexOf(key) > -1) return

			let values = terms[key]

			const wrapperProps = {
				label: key,
				onAddValueField: this.handleAddValueField.bind(null, key),
				onRemoveValueField: this.handleRemoveValueField.bind(null, key),
				onChange: this.handleChange.bind(null, key),
				key: index,
			}

			if (!Array.isArray(values)) {
				wrapperProps['multipleValues'] = false
				values = [values]
			}

			if (!values.length)
				values.push('')

			return (
				<FormElementContainer {...wrapperProps}>
					{values.map((v, i) => <TextInput value={v} key={key+i} />)}
				</FormElementContainer>
			)
		}).filter(v => v)
	},

	render: function () {
		return (
			<div className="term-edit-fields">
				{this.mapValues()}
			</div>
		)
	}
})

export default TermEditFields
