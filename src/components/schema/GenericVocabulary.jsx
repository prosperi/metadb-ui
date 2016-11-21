// for vocabulary metadata (initially) we're only concerned about a 'name'
// and 'description', which map to 'label' and 'alt_label', respectively.

import React from 'react'
import MetadataForm from '../metadata/MetadataForm.jsx'
import FormField from '../metadata/FormField.jsx'
import StringInput from '../metadata/StringInput.jsx'
import TextInput from '../metadata/TextInput.jsx'

const T = React.PropTypes

const GenericVocabulary = React.createClass({
	getInitialState: function () {
		return {
			data: this.props.data || {
				label: [],
				alt_label: [],
				pref_label: [],
				hidden_label: [],
			},
		}
	},

	handleChange: function (name, index, value) {
		const data = this.state.data
		data[name][index] = value

		this.setState({data})
	},

	handleSubmit: function (ev) {
		this.props.onSubmit && this.props.onSubmit(this.state.data)
	},

	render: function () {
		const formProps = {
			data: this.state.data,
			onChange: this.handleChange,
			onSubmit: this.handleSubmit,
		}

		return (
			<MetadataForm {...formProps}>
				<FormField name="label" label="Vocabulary name" renderer={StringInput} />
				<FormField name="alt_label" label="Description" renderer={TextInput} />
			</MetadataForm>
		)
	}
})

export default GenericVocabulary
