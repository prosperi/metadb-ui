import { configure } from '@kadira/storybook'
import '../src/scss/main.scss'

configure(() => {
	// table edit
	require('../src/components/stories/EditableTableCell.jsx')
	require('../src/components/stories/TableEditor.jsx')
	require('../src/components/stories/TableEditorFieldset.jsx')

	// item edit
	require('../src/components/stories/ControlledVocabularyField.jsx')
	require('../src/components/stories/TextInputField.jsx')
	require('../src/components/stories/FormElementWrapper.jsx')
	// require('../src/components/stories/TableEditorContainer') // TODO: return to this
}, module)
