'use strict'

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import TableEditor from '../table-editor/TableEditor.jsx'

const source = 'Special Collections & College Archives, Skillman Library, Lafayette College'
const exampleData = [
	{ filename: 'lc-spcol-mdl-prints-0001.tif', title: 'MR. LE MIS. DE LA LAFAYETTE', description: '', 'subject.lcsh': 'Lafayette, Marie Joseph Paul Yves Roch Gilbert Du Motier, marquis de, 1757-1834 -- Portraits;Washington, George, 1732-1799 -- Death and burial', 'format.medium': 'engraving', source: source },
	{ filename: 'lc-spcol-mdl-prints-0002.tif', title: 'DE LA LAFAYETTE', description: '', 'subject.lcsh': 'Lafayette, Marie Joseph Paul Yves Roch Gilbert Du Motier, marquis de, 1757-1834 -- Portraits', 'format.medium': 'line engraving', source: source },
	{ filename: 'lc-spcol-mdl-prints-0003.tif', title: 'LA FAYETTE', description: '', 'subject.lcsh': 'Lafayette, Marie Joseph Paul Yves Roch Gilbert Du Motier, marquis de, 1757-1834 -- Portraits', 'format.medium': 'lithograph', source: source },
	{ filename: 'lc-spcol-mdl-prints-0004.tif', title: 'LA FAYETTE', description: 'Same as I.3 but a later state with slightly different typography in title, etc.', 'subject.lcsh': 'Lafayette, Marie Joseph Paul Yves Roch Gilbert Du Motier, marquis de, 1757-1834 -- Portraits', 'format.medium': 'lithograph', source: source },
	{ filename: 'lc-spcol-mdl-prints-0005.tif', title: 'GENERAL WASHINGTON', description: 'Print depicts Lafayette, not Washington.', 'subject.lcsh': 'Lafayette, Marie Joseph Paul Yves Roch Gilbert Du Motier, marquis de, 1757-1834 -- Portraits', 'format.medium': 'lithograph', source: source },
]

const exampleHeadings = [
	'filename', 'title', 'description', 'source'
]

const baseProps = {
	activeCells: [],
	headings: exampleHeadings,
	data: exampleData,
}

const handlers = {
	onCellCancel: action('cell cancel'),
	onCellClick: action('cell click'),
	onCellSubmit: action('cell submit'),
}

storiesOf('TableEditor', module)
	.add('simple rendering table', () => (
		<TableEditor
			{...baseProps}
			{...handlers}
		/>
	))
	.add('-> with disabled columns', () => (
		<TableEditor
			{...baseProps}
			{...handlers}

			disabledKeys={['filename']}
		/>
	))
	.add('-> with cell placeholder', () => (
		<TableEditor
			{...baseProps}
			{...handlers}

			cellPlaceholder="[Intentionally Blank]"
		/>
	))
	.add('editable cells opened (+placeholder)', () => (
		<TableEditor
			{...baseProps}
			{...handlers}

			cellPlaceholder="[Intentionally Blank]"
			activeCells={[6, 9, 15]}
		/>
	))
