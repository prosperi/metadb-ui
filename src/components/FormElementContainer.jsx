// wrapper for Form Elements that provides support for adding/removing
// multiple values and selecting values to copy to other works.
//
// usage:
//
//     <FormElementContainer onChange={this.handleChange}>
//         <TextInput value="first value" />
//         <TextInput value="second value" />
//     </FormElementContainer>

import React from 'react'
import assign from 'object-assign'

const T = React.PropTypes

const FormElementContainer = React.createClass({
	propTypes: {
		onChange: T.func.isRequired,

		onAddValueField: T.func,
		onRemoveValueField: T.func,

		multipleValues: T.bool,
	},

	getDefaultProps: function () {
		return {
			multipleValues: true,
		}
	},

	addRowButton: function () {
		if (!this.props.multipleValues) 
			return
		
		return (
			<button
				children="+"
				className="add-row-btn"
				onClick={this.handleAddValueRow}
			/>
		)
	},

	handleAddValueRow: function (ev) {
		ev.preventDefault()

		this.props.onAddValueField()
	},

	handleChildChange: function (index, value) {
		this.props.onChange.apply(null, arguments)
	},

	handleRemoveValueRow: function (index, ev) {
		ev.preventDefault()

		this.props.onRemoveValueField.call(null, index)
	},

	maybeRenderLabel: function () {
		if (!this.props.label) return

		return (
			<label onClick={this.focusFirstChild}>
				{this.props.label}
			</label>
		)
	},

	removeButton: function (idx) {
		return (
			<button
				children="-"
				onClick={this.handleRemoveValueRow.bind(null, idx)}
			/>
		)
	},

	renderChildren: function () {
		return React.Children.map(this.props.children, (child, idx) => {
			const props = assign({}, {
				onChange: this.handleChildChange.bind(null, idx),
			}, child.props)

			return (
				<div className="form-element">
					{React.cloneElement(child, props)}
					{this.props.multipleValues ? this.removeButton(idx) : ''}
				</div>
			)

			return React.cloneElement(child)
		})
	},

	render: function () {
		return (
			<div className="form-element-wrapper">
				{this.maybeRenderLabel()}
				{this.renderChildren()}
				{this.addRowButton()}
			</div>
		)
	}
})

export default FormElementContainer
