import React from 'react'
import FormElementContainer from './FormElementContainer.jsx'
import TextInput from './form-elements/TextInput.jsx'

const T = React.PropTypes

const FormFieldsFromDataObject = React.createClass({
	propTypes: {
		data: T.object.isRequired,

		onAddValueField: T.func.isRequired,
		onChange: T.func.isRequired,
		onRemoveValueField: T.func.isRequired,

		ignoreKeys: T.arrayOf(T.string),
		stringValuesAreReadOnly: T.bool,
	},

	handleOnAddValueField: function (key) {
		this.props.onAddValueField.apply(null, arguments)
	},

	handleOnChange: function (key, index, value) {
		this.props.onChange.apply(null, arguments)
	},

	handleOnRemoveValueField: function (key, index) {
		this.props.onRemoveValueField.apply(null, arguments)
	},

	mapKeysToFormElements: function () {
		const keys = Object.keys(this.props.data)

		return keys.map((key, index) => {
			const ignore = this.props.ignoreKeys

			if (ignore && ignore.indexOf(key) > -1)
				return

			const vals = this.props.data[key]
			let children

			if (!Array.isArray(vals)) {
				children = (
					<TextInput
						key={key + '-1'}
						type={this.props.stringValuesAreReadOnly ? 'readOnly' : 'text'}
						value={vals}
					/>
				)
			} else {
				children = vals.map((val, index) => {
					<TextInput
						key={key+index+(val || 'empty')}
						value={val}
					/>
				})
			}

			const wrapperProps = {
				children,
				onAddValueField: this.handleOnAddValueField.bind(null, key),
				onChange: this.handleOnChange.bind(null, key, index),
				onRemoveValueField: this.handleOnRemoveValueField.bind(null, key, index),
			}

			if (this.props.useKeysAsLabels)
				wrapperProps.label = key

			return <FormElementContainer {...wrapperProps} />
		})
	},

	render: function () {
		return (
			<div>
				{this.mapKeysToFormElements()}
			</div>
		)
	}
})

export default FormFieldsFromDataObject
