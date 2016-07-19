import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import TableEditorFieldset from '../table-editor/Fieldset.jsx'

const fieldsArray = [
	'title', 'subject', 'description', 'description.note', 'creator.maker',
	'format.medium', 'date.original.display', 'date.original.search', 'description.size',
]

const selectedFields = [
	'title', 'subject', 'creator.maker', 'date.original.display',
]

storiesOf('TableEditorFieldset', module)
	.add('no legend', () => (
		<TableEditorFieldset
			fields={fieldsArray}
			onChange={action('selected')}
			selectedFields={[]}
		/>
	))
	.add('with legend', () => (
		<TableEditorFieldset
			fields={fieldsArray}
			legend="Some Metadata Fields"
			onChange={action('selected')}
			selectedFields={[]}
		/>
	))
	.add('some checked, limit not reached', () => (
		<TableEditorFieldset
			fields={fieldsArray}
			maxSelectedFields={selectedFields.length}
			onChange={action('selected')}
			selectedFields={selectedFields.slice(0,3)}
		/>
	))
	.add('some checked, limit of 4 reached', () => (
		<TableEditorFieldset
			fields={fieldsArray}
			maxSelectedFields={selectedFields.length}
			onChange={action('selected')}
			selectedFields={selectedFields}
			/>
	))
