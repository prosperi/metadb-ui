import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import SearchResultsPagerHeader from '../src/components/catalog/SearchResultsPagerHeader.jsx'
import data from './data/pages.json'

storiesOf('<SearchResultsPagerHeader />', module)
	.add('defaults @ start', () => {
		const props = {
			data,
			onNextPage: action('next-page'),
			onPreviousPage: action('previous-page'),
			onPerPageChange: action('per-page-change'),
		}

		return React.createElement(SearchResultsPagerHeader, props)
	})
