import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import TermEditFields from '../src/components/vocabulary/TermEditFields.jsx'

const val = {
	uri: 'http://example.com/ns/exampleTerm',
	label: ['Example Term'],
	alt_label: ['Alternate Label for Example Term', 'Another Alternate Label'],
	pref_label: ['Example Term'],
	hidden_label: [],
}

const props = {
	onAddValueField: action('adding value field'),
	onChange: action('change'),
	onRemoveValueField: action('removing value field'),
	values: val,
}

storiesOf('TermEditFields', module)
	.add('form', () => (
		<TermEditFields {...props} />
	))
