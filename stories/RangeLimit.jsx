import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import RangeLimit from '../src/components/catalog/RangeLimit.jsx'

import 'rc-slider/assets/index.css'

storiesOf('<RangeLimit />', module)
	.add('default', () => (
		<RangeLimit
			min={1500}
			max={2000}
			onSelectFacet={action('apply range')}
		/>
	))
