import React from 'react'
import assign from 'object-assign'

const T = React.PropTypes
const noop = function () {}

const FormElementWrapper = React.createClass({
	propTypes: {
		label: T.string,
		name: T.string,
		onChange: T.func,

		copyFields: T.bool,
		multipleValues: T.bool,
		onAddValueField: T.func,
		onCopyFields: T.func,
		placeholder: T.string,
		readOnly: T.bool,
	},

	getDefaultProps: function () {
		return {
			copyFields: false,
			multipleValues: false,
			onAddValueField: noop,
			onRemoveValueField: noop,
			placeholder: '',
			readOnly: false,
		}
	},

	addFieldButton: function (idx) {
		return (
			<button
				className="add-field-btn"
				onClick={this.props.onAddValueField}
				key={'add-field-'+idx}>
				{'+'}
			</button>
		)
	},

	hasMultipleValues: function () {
		return React.Children.count(this.props.children) > 1
	},

	handleChange: function (index, value) {
		if (this.props.onChange)
			this.props.onChange.apply(null, arguments)
	},

	handleCheckbox: function (childIdx) {
		this.props.onCopyFields && this.props.onCopyFields.call(null, childIdx)
	},

	mapChildren: function () {
		return React.Children.map(this.props.children, (child, idx) => {
			const props = {
				placeholder: child.props.placeholder || this.props.placeholder,
				readOnly: child.props.readOnly || this.props.readOnly,
				key: child.displayName + idx,
				onChange: this.handleChange.bind(null, idx)
			}

			return (
				<div className="form-element">
					{this.maybeRenderCopyFieldCheckbox()}
					{React.cloneElement(child, props)}
					{this.renderFieldButton(idx)}
				</div>
			)
		})
	},

	maybeRenderAddFieldButton: function () {
		const len = React.Children.count(this.props.children)
		if (this.props.multipleValues && !this.props.readOnly && len > 1)
			return this.addFieldButton(len)
	},

	maybeRenderCopyFieldCheckbox: function (idx) {
		if (this.props.copyFields)
			return (
				<input
					type="checkbox"
					key={idx}
					className="copy-field"
					onChange={this.handleCheckbox.bind(null, idx)}
				/>
			)
	},

	removeFieldButton: function (idx) {
		return (
			<button 
				className="remove-field-btn"
				dangerouslySetInnerHTML={{__html: '&ndash;'}}
				onClick={this.props.onRemoveValueField.bind(null,idx)}
				key={'remove-field-'+idx}
				/>
		)
	},

	renderFieldButton: function (idx) {
		if (!this.props.multipleValues) return

		const len = React.Children.count(this.props.children)
		return len > 1 ? this.removeFieldButton(idx) : this.addFieldButton()
	},


	renderLabel: function () {
		if (this.props.label)
			return <label key={'label'+this.props.label}>{this.props.label}</label>
	},

	render: function () {
		const wrapperProps = {
			className: 'form-element-wrapper'
		}

		return React.createElement('div', wrapperProps, [
			this.renderLabel(),
			this.mapChildren(),
			this.maybeRenderAddFieldButton(),
		])
	}
})

export default FormElementWrapper
