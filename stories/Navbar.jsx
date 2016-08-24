import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Navbar from '../src/components/Navbar.jsx'

storiesOf('<Navbar/>', module)
	.add('renders well enough', () => (
		<Navbar />
	))
