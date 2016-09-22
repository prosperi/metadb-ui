import { configure } from '@kadira/storybook'
import '../src/scss/main.scss'

configure(() => {
	// require('../stories/VocabularyList.jsx')

	// require('../stories/FormElementContainer.jsx')
	// require('../stories/ExampleTermEditor.jsx')

	// require('../stories/BulkTermsEditor.jsx')
	// require('../stories/FacetPanel.jsx')
	// require('../stories/SelectedFacetsList.jsx')
	require('../stories/FacetGroup.jsx')
	require('../stories/FacetListWithViewMore.jsx')
}, module)
