import { configure } from '@kadira/storybook'
import '../src/scss/main.scss'

configure(() => {
	require('../stories/VocabularyList.jsx')

	require('../stories/FormElementContainer.jsx')
	require('../stories/ExampleTermEditor.jsx')
}, module)
