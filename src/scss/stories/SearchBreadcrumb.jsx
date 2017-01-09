import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import SearchBreadcrumb from '../src/components/catalog/SearchBreadcrumb.jsx'

storiesOf('<SearchBreadcrumb />', module)
	.add('default w/ group', () => (
		<SearchBreadcrumb
			group="Library"
			onRemove={action('remove')}
			value="Special Collections"
		/>
	))
