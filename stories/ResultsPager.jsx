import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ResultsPager from '../src/components/catalog/ResultsPager.jsx'

storiesOf('<ResultsPager />', module)
	.add('@ start', () => {
		const props = {
			"current_page": 1,
			"next_page": 2,
			"prev_page": null,
			"total_pages": 924,
			"limit_value": 25,
			"offset_value": 0,
			"total_count": 23088,
			"first_page?": true,
			"last_page?": false,
		
			onNextClick: action('next'),
			onPreviousClick: action('previous'),
		}

		return (
			<div>
				<ResultsPager {...props} />
				<pre>{JSON.stringify(props, true, 2)}</pre>
			</div>
		)
	})
	.add('@end', function () {
		const props = {
			current_page: 924,
			next_page: null,
			prev_page: 923,
			total_pages: 924,
			limit_value: 25,
			offset_value: 23075,
			total_count: 23088,

			onNextClick: action('next'),
			onPreviousClick: action('previous'),
		}

		return (
			<div>
				<ResultsPager {...props} />
				<pre>{JSON.stringify(props, true, 2)}</pre>
			</div>
		)
	})
