import { configure } from '@kadira/storybook'

configure(() => {
	// table edit
	require('../src/components/stories/EditableTableCell')
	require('../src/components/stories/TableEditor')
	require('../src/components/stories/TableEditorFieldset')

	// item edit
	require('../src/components/stories/ControlledVocabularyField')
	require('../src/components/stories/TextInputField')
	// require('../src/components/stories/TableEditorContainer') // TODO: return to this
}, module)
