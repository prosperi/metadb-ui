// This is a container for metadata fields that are common to Vocabulary / Term
// resources. These data types share the structure:
//
// 		{
// 			"uri": String,
//		 	"label": Array,
// 			"alt_label": Array
// 			"hidden_label": Array,
// 			"pref_label": Array,
// 		}
//
// with Vocabulary containing fields (namely `terms` and `term_count`) that
// are unique to that data type. To prevent these (and potentially others)
// from being added to the form, the `ignoreKeys` prop is provided. This
// is an array of keys to be skipped when mapping the keys of `props.data`.
//
// While semantically required to be an array, we use `pref_label` as if it
// were a string: its purpose being to identify the preferred label of the term.
// This is chosen using a <Select /> element derived from the values of `label`,
// `alt_label`, and `hidden_label`. 

import React from 'react'
import FormElementContainer from '../FormElementContainer.jsx'
import TextInput from '../form-elements/TextInput.jsx'
import Select from '../form-elements/Select.jsx'

const T = React.PropTypes

const PREF_LABEL_KEY = 'pref_label'
const PREF_LABEL_NAME = PREF_LABEL_KEY

const VocabularyMetadataFormFields = React.createClass({
	propTypes: {
		data: T.shape({
			uri: T.string.isRequired,
			label: T.arrayOf(T.string).isRequired,
			alt_label: T.arrayOf(T.string).isRequired,
			hidden_label: T.arrayOf(T.string).isRequired,
			pref_label: T.arrayOf(T.string).isRequired,
		}),

		ignoreKeys: T.array,

		onAddValueField: T.func.isRequired,
		onChange: T.func.isRequired,
		onRemoveValueField: T.func.isRequired,
	},

	buildPrefLabelSelect: function (eligibleValues) {
		const prefLabelValue = this.props.data[PREF_LABEL_KEY][0]
		const select = (
			<Select
				options={eligibleValues}
				value={prefLabelValue}
			/>
		)

		return (
			<FormElementContainer
				children={select}
				key={PREF_LABEL_NAME}
				label={PREF_LABEL_NAME}
				multipleValues={false}
				onChange={this.handleOnChange.bind(null, PREF_LABEL_KEY)}
			/>
		)
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

	mapDataKeysToFormElements: function () {
		const keys = Object.keys(this.props.data)
		const ignoreKeys = this.props.ignoreKeys
		const eligiblePrefValues = []

		const els = keys.map((key) => {
			if (key === PREF_LABEL_KEY) 
				return

			if (ignoreKeys && ignoreKeys.indexOf(key) > -1)
				return

			let vals = this.props.data[key]
			let children

			if (!Array.isArray(vals)) {
				children = (
					<TextInput
						key={key+'0'+(vals||'empty')}
						value={vals}
					/>
				)
			} else {
				// make a copy of values so we're not pushing to the original data
				vals = [].concat(vals)

				if (!vals.length)
					vals.push('')

				children = vals.map((val, index) => {
					if (val !== '') 
						eligiblePrefValues.push(val)

					return <TextInput key={key+index+(val||'empty')} value={val} />
				})
			}

			const props = {
				children,
				key,
				label: key,
				multipleValues: Array.isArray(vals),
				onAddValueField: this.handleOnAddValueField.bind(null, key),
				onChange: this.handleOnChange.bind(null, key),
				onRemoveValueField: this.handleOnRemoveValueField.bind(null, key),
			}

			return <FormElementContainer {...props} />
		})

		return [].concat(els, this.buildPrefLabelSelect(eligiblePrefValues))
	},

	render: function () {
		return (
			<div className="vocabulary-metadata-form-fields">
				{this.mapDataKeysToFormElements()}
			</div>
		)
	}
})

export default VocabularyMetadataFormFields
