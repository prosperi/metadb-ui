import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import BulkTermsEditor from '../src/components/vocabulary/BulkTermsEditor.jsx'

storiesOf('BulkTermsEditor', module)
	.add('it works!', () => (
		<BulkTermsEditor
			onSubmit={action('submit')}
		/>
	))
