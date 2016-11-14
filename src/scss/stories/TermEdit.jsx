import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import TermEdit from '../src/components/vocabulary/TermEdit.jsx'

import data from './data/testVocab'

storiesOf('TermEdit', module)
	.add('example vocabulary', () => (
		<TermEdit
			onAddValueField={action('add value field')}
			onChange={action('change')}
			onRemoveValueField={action('remove value field')}
			displayKey="label"
			
			vocabulary={data}
		/>
	))
