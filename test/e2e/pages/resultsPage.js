export default {
	elements: {
		firstResultRow: {
			selector: '.results-table tbody tr:first-child'
		},

		thumbnail: {
			selector: '.thumbnail-preview'
		},


		dateOriginal: {
			selector: '.facet-panel[data-facet="date_original_dtsi"]'
		},
		dateOriginalHeader: {
			selector: '.facet-panel[data-facet="date_original_dtsi"] header'
		},
		dateOriginalInput: {
			selector: '.facet-panel[data-facet="date_original_dtsi"] input'
		},
		dateOriginalButton: {
			selector: '.facet-panel[data-facet="date_original_dtsi"] button'
		},


		searchInput: {
			selector: 'input[name="query"]'
		},
		resultsRow: {
			selector: '.results-table-container tbody tr'
		},
		resultsFirstChild: {
			selector: '.results-table-container tbody tr td a'
		},


		titleInput: {
			selector: 'input[label="Title"]'
		},
		dateInput: {
			selector: 'input[type="date"]'
		}
	}
}
