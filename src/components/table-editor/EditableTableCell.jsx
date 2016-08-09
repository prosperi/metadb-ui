import React from 'react'

const T = React.PropTypes

const noop = () => {}
const EditableTableCell = React.createClass({
	propTypes: {
		disabled: T.bool,
		editing: T.bool,
		inputProps: T.object,

		onCancel: T.func,
		onClick: T.func,
		onSubmit: T.func,

		placeholder: T.string,
		
		style: T.object,

		useInput: T.bool,
	},

	getDefaultProps: function () {
		return {
			disabled: false,
			editing: false,

			onCancel: noop,
			onClick: noop,
			onSubmit: noop,

			placeholder: '',

			style: {
				cell: {},
				disabled: {
					backgroundColor: '#eee',
					color: '#999',
				},
				editing: {
					buttons: {},
					container: {},
					textarea: {
						display: 'block'
					},
				},
				placeholder: {
					color: '#999'
				},
			},

			useInput: false,
		}
	},

	handleCancel: function (ev) {
		this.props.onCancel()
	},

	handleSubmit: function (ev) {
		if (this._input)
			this.props.onSubmit(this._input.value)
	},

	handleClick: function (ev) {
		if (this.props.disabled || this.props.editing) return
		
		this.props.onClick(this.props.editing)
	},

	renderContent: function () {
		const hasValue = !!this.props.value

		return (
			<span style={hasValue ? {} : this.props.style.placeholder}>
				{hasValue ? this.props.value : this.props.placeholder}
			</span>
		)
	},

	renderTextbox: function () {
		const containerStyle = this.props.style.editing.container
		const textareaStyle = this.props.style.editing.textarea
		const buttonStyle = this.props.style.buttons

		const el = this.props.useInput ? 'input' : 'textarea'
		const elProps = {
			defaultValue: this.props.value,
			placeholder: this.props.placeholder,
			ref: el => this._input = el,
			...this.props.inputProps,
		}

		return (
		<div style={containerStyle}>
			
			<input
				defaultValue={this.props.value}
				placeholder={this.props.placeholder}
				ref={(el) => { this._input = el }}
				style={textareaStyle}
			/>
			<button onClick={this.handleCancel} style={buttonStyle}>Cancel</button>
			<button onClick={this.handleSubmit} style={buttonStyle}>Submit</button>
		</div>
		)
	},

	render: function () {
		const disabled = this.props.disabled
		const styles = this.props.style
		const cellStyle = disabled ? styles.disabled : styles.cell
		return (
		<td onMouseUp={this.handleClick} style={cellStyle}>
			{ this.props.editing ? this.renderTextbox() : this.renderContent() }
		</td>
		)
	}
})

export default EditableTableCell
