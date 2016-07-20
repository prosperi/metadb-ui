import React from 'react'
import assign from 'object-assign'

const T = React.PropTypes
const noop = function () {}

const FormElementWrapper = React.createClass({
	propTypes: {
		// required props
		name: T.string.isRequired,
		onChange: T.func.isRequired,

		displayLabel: T.bool,
		formLabel: T.string,
		multipleValues: T.bool,
		onAddValueField: T.func,
		placeholder: T.string,
		readOnly: T.bool,
	},

	getDefaultProps: function () {
		return {
			displayLabel: true,
			formLabel: '',
			multipleValues: false,
			onAddValueField: noop,
			onRemoveValueField: noop,
			placeholder: '',
			readOnly: false,
		}
	},

	hasMultipleValues: function () {
		return React.Children.count(this.props.children) > 1
	},

	handleChange: function (idx, val) {
		this.props.onChange.call(null, idx, val)
	},

	mapChildren: function () {
		return React.Children.map(this.props.children, (child, idx) => {
			const props = {
				name: this.props.name + '[]',
				onChange: this.handleChange.bind(null, idx),
				placeholder: child.props.placeholder || this.props.placeholder,
				readOnly: child.props.readOnly || this.props.readOnly,
			}

			return (
				<div className="form-element">
					{React.cloneElement(child, props)}
					{this.renderFieldButton(idx)}
				</div>
			)
		})
	},

	maybeRenderAddFieldButton: function () {
		const len = React.Children.count(this.props.children)
		if (this.props.multipleValues && !this.props.readOnly && len > 1)
			return this.addFieldButton()
	},

	renderFieldButton: function (idx) {
		if (!this.props.multipleValues) return
			
		const len = React.Children.count(this.props.children)
		return len > 1 ? this.removeFieldButton() : this.addFieldButton()
	},

	addFieldButton: function () {
		return (
			<button 
				className="add-field-btn"
				onClick={this.props.onAddValueField}>
				{'+'}
			</button>
		)
	},

	removeFieldButton: function (idx) {
		return (
			<button 
				className="remove-field-btn"
				dangerouslySetInnerHTML={{__html: '&mdash;'}}
				onClick={this.props.onRemoveValueField.bind(null,idx)}
				/>
		)
	},

	renderLabel: function () {
		if (!this.props.displayLabel)
			return ''

		const formLabel = this.props.formLabel
		const name = this.props.name

		return (
			<label>
				{formLabel ? formLabel : name}
			</label>
		)
	},

	render: function () {
		return (
			<div className="form-element-wrapper">
				{this.renderLabel()}
				{this.mapChildren()}
				{this.maybeRenderAddFieldButton()}
			</div>
		)
	}
})

export default FormElementWrapper
