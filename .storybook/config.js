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
	require('../stories/SearchFacetSidebar.jsx')
	require('../stories/ResultsPager.jsx')
	require('../stories/SearchResultsPagerHeader.jsx')
	require('../stories/SearchResultsHeader.jsx')
	require('../stories/SearchBreadcrumb.jsx')
	require('../stories/SearchBreadcrumbTrail.jsx')
	require('../stories/RangeLimit.jsx')
}, module)
