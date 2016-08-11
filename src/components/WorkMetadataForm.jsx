'use strict'

import React from 'react'
import assign from 'object-assign'

import FormElementWrapper from './form-elements/FormElementWrapper.jsx'
import ControlledVocabulary from './form-elements/ControlledVocabularyField.jsx'
import ReadOnly from './form-elements/ReadOnly.jsx'

// import TextInputField from './form-elements/TextInputField.jsx'

import TextInput from './form-elements/TextInput.jsx'
import TextArea from './form-elements/TextArea.jsx'

import sk from '../../lib/schema-keys.js'

const T = React.PropTypes

const WorkMetadataForm = React.createClass({
	propTypes: {
		data: T.object.isRequired,
		fetchVocabulary: T.func.isRequired,
		vocabulary: T.object.isRequired,
		schema: T.array.isRequired,
		onChange: T.func.isRequired,
		onSubmit: T.func.isRequired,

		onAddValueField: T.func,
		readOnly: T.bool,
	},

	getDefaultProps: function () {
		return {
			onAddValueField: function () {},
			readOnly: false,
		}
	},

	getInitialState: function () {
		return {
			displayCopyFieldCheckboxes: false,
		}
	},

	getComponentForElement: function (schema) {
		const type = schema.type

		if (schema.authorities.length)
			return ControlledVocabulary

		switch (type) {
			case 'text':
				return TextArea
			default:
				return TextInput
		}
	},

	handleAddValueField: function (key) {
		this.props.onAddValueField.call(null, key)
	},

	handleFormSave: function () {
		this.props.onSubmit()
	},

	handleRemoveValueField: function (key, idx) {
		this.props.onRemoveValueField.apply(null, arguments)
	},

	handleChange: function (key, index, value) {
		this.props.onChange.apply(null, arguments)
	},

	mapFormElements: function () {
		const schema = this.props.schema
		return schema.map((scheme, idx) => {
			const { label, type, name, authorities } = scheme
			let data = this.props.data[name]

			// make sure we're dealing with arrays for data
			if (!Array.isArray(data)) {
				data = [data]
			}

			// if the array is empty, adding an empty string will
			// render an empty component
			if (!data.length)
				data.push('')

			// skip object fields for now
			if (Object.prototype.toString.call(data[0]) === '[object Object]')
				return

			const Element = this.getComponentForElement(scheme)
			const elProps = {}

			if (authorities.length) {
				let uri = authorities.uri

				elProps.fetchVocabulary = this.props.fetchVocabulary.bind(null, authorities)
				elProps.terms = this.props.vocabulary[uri] || {}
			}

			return (
				<FormElementWrapper
					copyFields={this.state.displayCopyFieldCheckboxes}
					key={idx}
					label={label}
					multipleValues={true}
					onAddValueField={this.handleAddValueField.bind(null, name)}
					onRemoveValueField={this.handleRemoveValueField.bind(null, name)}
					onChange={this.handleChange.bind(null, name)}
				>
					{data.map((d, i) => (
						React.createElement(Element, {...elProps, value: d, key: i})
					))}
				</FormElementWrapper>
			)
		})
	},

	renderSaveButton: function () {
		if (this.props.readOnly) return ''
		return (
			<button onClick={this.handleFormSave}>Save Changes</button>
		)
	},

	toggleDisplayCopyMetadata: function () {
		this.setState({
			displayCopyFieldCheckboxes: !this.state.displayCopyFieldCheckboxes
		})
	},

	render: function () {
		return (
			<div className="work-metadata">
				<button 
					onClick={this.toggleDisplayCopyMetadata}
					>
					{
						this.state.displayCopyFieldCheckboxes
						? 'Hide copy-fields boxes' 
						: 'Copy fields to another work'
					}
				</button>


				{this.mapFormElements()}
				{this.renderSaveButton()}
			</div>
		)
	}
})

export default WorkMetadataForm
