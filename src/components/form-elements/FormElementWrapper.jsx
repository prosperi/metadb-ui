import React from 'react'

const T = React.PropTypes

const FormElementWrapper = React.createClass({
	propTypes: {
		// required props
		name: T.string.isRequired,
		onChange: T.func.isRequired,

		displayLabel: T.bool,
		formLabel: T.string,
		onAddValueField: T.func,
	},

	getDefaultProps: function () {
		return {
			displayLabel: true,
			formLabel: '',
			multipleValues: false,
			onAddValueField: function () {},
		}
	},

	handleAddValueField: function () {
		this.props.onAddValueField()
	},

	handleChange: function (idx, val) {
		this.props.onChange.call(null, idx, val)
	},

	mapChildren: function () {
		return React.Children.map(this.props.children, (child, idx) => {
			const props = {
				name: this.props.name,
				onChange: this.handleChange.bind(null, idx),
			}
			return React.cloneElement(child, props)
		})
	},

	renderAddButton: function () {
		return <button onClick={this.handleAddValueField}>{'+'}</button>
	},

	renderLabel: function () {
		if (!this.props.displayLabel)
			return ''

		const formLabel = this.props.formLabel
		const name = this.props.name

		return (
			<label style={{display: 'block'}}>{formLabel ? formLabel : name}</label>
		)
	},

	render: function () {
		return (
			<div className="form-element">
				{this.renderLabel()}
				{this.mapChildren()}
				{this.props.onAddValueField ? this.renderAddButton() : ''}
			</div>
		)
	}
})

export default FormElementWrapper
