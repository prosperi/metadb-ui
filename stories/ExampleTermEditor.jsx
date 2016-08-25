import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ExampleTermEditor from '../src/components/vocabulary/ExampleTermEditor.jsx'
import BulkTermsEditor from '../src/components/vocabulary/BulkTermsEditor.jsx'
storiesOf('<ExampleTermEditor/>', module)
	.add('hullo', () => (
		<ExampleTermEditor


		/>
	))

storiesOf('<BulkTermsEditor />', module)
	.add('try this one', () => (
		<BulkTermsEditor />
	))
