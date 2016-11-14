// GenericWork schema form
import React from 'react'

import WorkMetadataForm from '../metadata/WorkMetadataForm.jsx'
import FormField from '../metadata/FormField.jsx'
import StringInput from '../metadata/StringInput.jsx'

const T = React.PropTypes

const GenericWork = React.createClass({
	propTypes: {

	},

	render: function () {
		const formProps = {
			defaultProps: {
				renderer: StringInput,
			},
			...this.props,
		}

		return (
			<WorkMetadataForm {...formProps}>
				<FormField name="title" label="Title" />
				<FormField name="description_note" label="Description (Note)" />
				<FormField name="creator" label="Creator" multiple />
				<FormField name="subject_lcsh" label="Subject (LCSH)" multiple />
				<FormField name="publisher" label="Publisher (Original)" multiple />
				<FormField name="date_original" label="Date (Original)" />
				<FormField name="format_medium" label="Format (Medium)" multiple />
				<FormField name="format_extent" label="Format (Extent)" />
				<FormField name="description" label="Description" />
				<FormField name="description_condition" label="Description (Condition)" />
				<FormField name="description_provenance" label="Description (Provenance)" />
				<FormField name="description_series" label="Description (Series)" />
				<FormField name="identifier_itemnumber" label="Identifier (Item Number)" />
				<FormField name="publisher_original" label="Publisher (Original)" />
				<FormField name="publisher_digital" label="Publisher (Digital)" />
				<FormField name="format_digital" label="Format (Digital)" />
				<FormField name="source" label="Source" />
				<FormField name="rights" label="Rights (Digital)" />
				<FormField name="relation_ispartof" label="Relation (IsPartOf)" />
			</WorkMetadataForm>
		)
	}
})

export default GenericWork
