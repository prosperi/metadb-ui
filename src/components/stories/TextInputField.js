import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import TextInputField from '../form-elements/TextInputField'

storiesOf('TextInputField', module)
	.add('plain', () => (
		<TextInputField 
			onChange={action('change')}
			placeholder="I'm an <input>"
		/>
	))
	.add('largerField', () => (
		<TextInputField
			largerField={true}
			onChange={action('change')}
			placeholder="I'm a <textarea> now"
		/>
	))
