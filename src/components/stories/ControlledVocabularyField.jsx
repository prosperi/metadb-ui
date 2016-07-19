import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import ControlledVocabularyField from '../form-elements/ControlledVocabularyField.jsx'

const vocab = [
	'100 ORIENTATION',
	'101 IDENTIFICATION',
	'102 MAPS',
	'103 PLACE NAMES',
	'110 INFORMATION SOURCES',
	'119 ARTIFACT AND ARCHIVE COLLECTIONS',
	'130 GEOGRAPHY',
	'130 GEOGRAPHY TOPOGRAPHY AND GEOLOGY',
	'131 LOCATION',
	'132 CLIMATE',
	'133 GEOLOGY AND TOPOGRAPHY',
	'133 TOPOGRAPHY AND GEOLOGY',
	'135 MINERAL RESOURCES',
	'136 FAUNA',
	'137 FLORA',
	'140 HUMAN BIOLOGY',
	'141 ANTHROPOMETRY',
	'142 DESCRIPTIVE SOMATOLOGY',
	'144 RACIAL IDENTIFICATION',
	'150 BEHAVIOR PROCESSES AND PERSONALITY',
	'159 LIFE HISTORY MATERIALS',
	'160 DEMOGRAPHY',
	'161 POPULATION',
	'162 COMPOSITION OF POPULATION',
	'166 INTERNAL MIGRATION',
]

storiesOf('ControlledVocabularyField', module)
	.add('nothing (no vocab/value)', () => (
		<ControlledVocabularyField
			onChange={action('change')}
		/>
	))
	.add('no value', () => (
		<ControlledVocabularyField
			placeholder="Enter ControlledVocab value"
			onChange={action('change')}
			vocabulary={vocab}
		/>
	))
	.add('value provided', () => (
		<ControlledVocabularyField
			onChange={action('change')}
			value="132 CLIMATE"
			vocabulary={vocab}
		/>
	))
