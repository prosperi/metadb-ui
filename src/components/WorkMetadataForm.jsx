// 🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
// it's not _really_ a form, is it? just a collection of form elements
'use strict'

import React from 'react'
import assign from 'object-assign'

import FormElementWrapper from './form-elements/FormElementWrapper.jsx'
import ControlledVocabulary from './form-elements/ControlledVocabularyField.jsx'
import TextInput from './form-elements/TextInputField.jsx'
import ReadOnly from './form-elements/ReadOnly.jsx'

import MediaPreview from './MediaPreview.jsx'

import sk from '../../lib/schema-keys.js'

const T = React.PropTypes

const WorkMetadataForm = React.createClass({
	propTypes: {
		data: T.object.isRequired,
		schema: T.object.isRequired,
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

	handleAddValueField: function (key) {
		this.props.onAddValueField.call(null, key)
	},

	handleFormUpdate: function () {
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
		const schemaKeys = Object.keys(schema)

		return schemaKeys.map((key, idx) => {
			const schema = this.props.schema[key]
			let data = this.props.data[key]
			const canHaveMultipleValues = Array.isArray(data) && schema.multipleValues

			let Element, elProps, wrapperProps

			// if we've gotten an empty array from the server, we need to
			// put something at the first position so the later call to
			// `data.map` will render an element
			if (canHaveMultipleValues && !data.length) data.push('')			

			if (this.props.readOnly) {
				Element = ReadOnly
				elProps = {}
			}

			else if (schema[sk.CONTROLLED_VOCABULARY]) {
				Element = ControlledVocabulary
				elProps = {
					addTerms: schema[sk.ADD_TERMS],
					disabled: this.props.readOnly,
					multipleTerms: schema[sk.MULTIPLE_TERMS],
					vocabulary: schema[sk.VOCABULARY],
				}
			}

			else {
				Element = TextInput
				elProps = {
					displayDate: schema[sk.DISPLAY_DATE],
					largerField: schema[sk.LARGER_FIELD],
					searchDate: schema[sk.SEARCH_DATE],
				}
			}

			wrapperProps = {
				label: key,
				multipleValues: canHaveMultipleValues,
				key: key + idx,
			}

			if (!this.props.readOnly) {
				wrapperProps = assign(wrapperProps, {
					onAddValueField: this.handleAddValueField.bind(null, key),
					onRemoveValueField: this.handleRemoveValueField.bind(null, key),
					onChange: this.handleChange.bind(null, key),
				})
			}

			return (
			<FormElementWrapper {...wrapperProps}>
				{canHaveMultipleValues
				  ? data.map((d,i) => <Element {...elProps} key={d+i} value={d} />)
					: <Element {...elProps} key={data+0}value={data} />
				}
			</FormElementWrapper>
			)
		})
	},

	renderUpdateButton: function () {
		if (this.props.readOnly) return ''
		return (
			<button onClick={this.handleFormUpdate}>Update</button>
		)
	},

	render: function () {
		return (
			<div className="work-metadata-edit">
				<MediaPreview
					thumbnailUrl="/assets/lc-spcol-mckelvy-house-0013-300.jpg"
					availableSizes={[
						{name: 'Medium', dimensions: '615x800', url: '#'},
						{name: 'Large', dimensions: '1539x1999', url: '#'},
						{name: 'Full size', dimensions: '4356x5658', url: '#'},
					]}
				/>
				<div className="work-metadata">
					{this.mapFormElements()}
					{this.renderUpdateButton()}
				</div>
			</div>
		)
	}
})

export default WorkMetadataForm
