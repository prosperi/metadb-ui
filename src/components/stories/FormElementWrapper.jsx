import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

// the Component of the hour
import FormElementWrapper from '../form-elements/FormElementWrapper.jsx'

// + the rest
import TextInputField from '../form-elements/TextInputField.jsx'
import ReadOnly from '../form-elements/ReadOnly.jsx'
import ControlledVocabularyField from '../form-elements/ControlledVocabularyField.jsx'

storiesOf('FormElementWrapper', module)
	.add('w/ single TextInputField, non-multiple', () => (
		<FormElementWrapper
			name="Text Field"
			onChange={action('change')}
		>
			<TextInputField/>
		</FormElementWrapper>
	))
	.add('w/ single TextInputField, multiple', () => (
		<FormElementWrapper
			name="Multiple Text Fields"
			multipleValues={true}
			onChange={action('change')}
			onAddValueField={action('add value field')}
			onRemoveValueField={action('remove value field')}
		>
			<TextInputField/>
		</FormElementWrapper>
	))
	.add('w/ multiple TextInputFields', () => (
		<FormElementWrapper
			name="Multiple Text Fields"
			multipleValues={true}
			placeholder="Placeholder passed"
			onChange={action('change')}
			onRemoveValueField={action('remove value field')}
			onAddValueField={action('add value field')}
		>
			<TextInputField/>
			<TextInputField/>
			<TextInputField placeholder="custom placeholder"/>
		</FormElementWrapper>
	))
	.add('w/ single large TextInputField, non-multiple', () => (
		<FormElementWrapper
			name="Multiple Large Text Fields"
			onChange={action('change')}
			onRemoveValueField={action('remove value field')}
			onAddValueField={action('add value field')}
		>
			<TextInputField largerField={true} />
		</FormElementWrapper>
	))
	.add('w/ single large TextInputField, multiple', () => (
		<FormElementWrapper
			name="Multiple Large Text Fields"
			multipleValues={true}
			onChange={action('change')}
			onRemoveValueField={action('remove value field')}
			onAddValueField={action('add value field')}
		>
			<TextInputField largerField={true} />
		</FormElementWrapper>
	))
	.add('w/ multiple large TextInputFields', () => (
		<FormElementWrapper
			name="Multiple Large Text Fields"
			multipleValues={true}
			onChange={action('change')}
			onRemoveValueField={action('remove value field')}
			onAddValueField={action('add value field')}
		>
			<TextInputField largerField={true} />
			<TextInputField largerField={true} />
		</FormElementWrapper>
	))

