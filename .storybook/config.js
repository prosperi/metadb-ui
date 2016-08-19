import { configure } from '@kadira/storybook'
import '../src/scss/main.scss'

configure(() => {
	require('../stories/VocabularyList.jsx')
	require('../stories/TermEditFields.jsx')

	require('../stories/TermEdit.jsx')
}, module)
