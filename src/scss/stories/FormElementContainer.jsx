import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import FormElementContainer from '../src/components/FormElementContainer.jsx'
import TextInput from '../src/components/form-elements/TextInput.jsx'
storiesOf('<FormElementContainer/>', module)
	.add('`onChange` for child registers in parent', () => (
		<FormElementContainer onChange={action('change')}>
			<TextInput />
		</FormElementContainer>
	))
