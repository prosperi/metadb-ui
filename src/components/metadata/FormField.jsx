/**
	<FormField
		name="title_en"
		label="Title (English)"
		component={TextInput}
		/>

		<FormField
			name="subject_ocm"
			label="Subject (OCM)"
			component={ControlledVocabulary}
			authority="https://example-ocm.org"
			multiple
		/>
*/
import React from 'react'
import assign from 'object-assign'

const noop = () => {}

const T = React.PropTypes

const FormField = React.createClass({
	propTypes: {
		name: T.string.isRequired,

		/**
		 *  implied-required fields
		 *  ---------
		 *  these are fields needed to actually accomplish anything, but will
		 *  be provided by a form container (*cough* WorkMetadataForm *cough*).
		 *  however, if we mark them as `.isRequired`, propTypes will throw
		 *  bc they're not declared explicitly (but passed via the container's
		 *  React.Children.map call)
		 */

		onChange: T.func,
		value: T.array,

		hideLabel: T.bool,
		label: T.string,
		multiple: T.bool,

		// these are required to inform the form state handler that
		//   a) an empty value has been added to the array
		//   b) a value from the array has been removed
		// however, these are not needed for fields that do not allow multiple
		// values. in practice, these will be popuated from the form container
		onAddValueField: T.func,
		onRemoveValueField: T.func,

		renderer: T.func,
	},

	getDefaultProps: function () {
		return {
			onChange: noop,
			onAddValueField: noop,
			onRemoveValueField: noop,
			value: [],
		}
	},

	allowsMultipleValues: function () {
		return !!this.props.multiple
	},

	// TODO: make sure this actually does what it's supposed to
	focusFirstChild: function () {
		if (!this.refs || !this.refs.length)
			return

		this.refs[0].focus && this.refs[0].focus()
	},

	handleAddValueRow: function (ev) {
		ev.preventDefault && ev.preventDefault()
		this.props.onAddValueField && this.props.onAddValueField()
	},

	handleChange: function (ev) {
		if (ev.target && ev.target.value)
			return this.props.onChange(ev.target.value)

		return this.props.onChange(ev)
	},

	handleRemoveValueRow: function (index, ev) {
		ev.preventDefault && ev.preventDefault()
		this.props.onRemoveValueField && this.props.onRemoveValueField(index)
	},

	maybeRenderAddButton: function () {
		if (!this.allowsMultipleValues())
			return

		return this.renderAddButton()
	},

	maybeRenderLabel: function () {
		if (this.props.hideLabel)
			return false

		return (
			<label onClick={this.focusFirstChild}>
				{this.props.label || this.props.name}
			</label>
		)
	},

	renderAddButton: function () {
		const props = {
			children: '+',
			className: 'form-field--add-row-btn',
			key: 'add-row-btn',
			onClick: this.handleAddValueRow,
		}

		return React.createElement('button', props)
	},

	renderRemoveButton: function (idx) {
		const props = {
			children: '-',
			className: 'form-field--remove-row-btn',
			key: 'remove-row-btn',
			onClick: this.handleRemoveValueRow.bind(null, idx),
		}

		return React.createElement('button', props)
	},

	renderFieldComponents: function () {
		const Component = this.props.renderer
		let values = this.props.value || []

		// if we're only allowing one value to be passed as a business rule,
		// we'll only worry about the first item in the array (of which there
		// should _probably_ only be one)
		if (!this.allowsMultipleValues())
			values = this.props.value.slice(0, 1)

		const componentProps = assign({}, this.props)
		delete componentProps.value
		delete componentProps.multiple

		const keyBase = 'ff-' + this.props.name

		return values.map((value, index) => {
			const props = assign({
				key: keyBase + '-value-' + index,
				onChange: this.handleChange,
				value,
			}, componentProps)

			return (
				<div className="form-element" key={keyBase + '-c-' + index}>
					{React.createElement(Component, props)}
					{this.allowsMultipleValues() ? this.renderRemoveButton(index) : null}
				</div>
			)
		})
	},

	render: function () {
		if (!this.props.renderer || (typeof this.props.renderer !== 'function'))
			return

		return (
			<div className="form-element-wrapper">
				{this.maybeRenderLabel()}
				{this.renderFieldComponents()}
				{this.maybeRenderAddButton()}
			</div>
		)
	}
})

export default FormField
