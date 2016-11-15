// container for work-metadata-form fields
import React from 'react'
import assign from 'object-assign'

const T = React.PropTypes

const DEFAULT_FIELD_NAME = 'undefined-field'

const MetadataForm = React.createClass({
	propTypes: {
		data: T.object,

		onAddValueField: T.func,
		onChange: T.func,
		onRemoveValueField: T.func,
		onSubmit: T.func,

		defaultProps: T.object,
	},

	handleOnAddValueField: function (/* name */) {
		this.props.onAddValueField && this.props.onAddValueField.apply(null, arguments)
	},

	handleOnChange: function (/* name, index, value */) {
		this.props.onChange && this.props.onChange.apply(null, arguments)
	},

	handleOnRemoveValueField: function (/* name, index */) {
		this.props.onRemoveValueField && this.props.onRemoveValueField.apply(null, arguments)
	},

	handleSubmit: function (ev) {
		ev.preventDefault && ev.preventDefault()
		this.props.onSubmit && this.props.onSubmit()
	},

	renderFormFields: function () {
		const data = this.props.data || {}
		return React.Children.map(this.props.children, (formElement, index) => {
			// if there's no name, maybe we should set a default one?
			const name = formElement.props.name || (DEFAULT_FIELD_NAME + '-' + index)
			const value = data[name] || ['']

			const wrapperDefaults = {
				onChange: this.handleOnChange.bind(null, name),
				onAddValueField: this.handleOnAddValueField.bind(null, name),
				onRemoveValueField: this.handleOnRemoveValueField.bind(null, name),
				value,
			}

			const mergedProps = assign({},
				wrapperDefaults,
				this.props.defaultProps,
				formElement.props
			)

			mergedProps.key = 'md-form!' + mergedProps.name + '@' + index

			return React.cloneElement(formElement, mergedProps)
		})
	},

	render: function () {
		return (
			<form onSubmit={this.handleSubmit}>
				{this.renderFormFields()}
			</form>
		)
	}
})

export default MetadataForm
