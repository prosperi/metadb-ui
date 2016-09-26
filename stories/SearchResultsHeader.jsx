import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import SearchResultsHeader from '../src/components/catalog/SearchResultsHeader.jsx'
import data from './data/pages.json'

let view = 'list'

storiesOf('<SearchResultsHeader />', module)
	.add('defaults', () => {
		const props = {
			pageData: data,
			onNextPage: action('next-page'),
			onOpenToolModal: action('open-tool-modal'),
			onPreviousPage: action('previous-page'),
			onPerPageChange: action('per-page-change'),
			onViewChange: action('view-change'),
			view,
			viewOptions: ['list', 'gallery'],
		}

		return React.createElement(SearchResultsHeader, props)
	})
