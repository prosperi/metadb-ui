import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import TableEditorContainer from '../table-editor/TableEditorContainer.jsx'

const source = 'Special Collections & College Archives, Skillman Library, Lafayette College'
const exampleValues = [
	{ filename: 'lc-spcol-mdl-prints-0001.tif', title: 'MR. LE MIS. DE LA LAFAYETTE', description: '', 'subject.lcsh': 'Lafayette, Marie Joseph Paul Yves Roch Gilbert Du Motier, marquis de, 1757-1834 -- Portraits;Washington, George, 1732-1799 -- Death and burial', 'format.medium': 'engraving', source: source },
	{ filename: 'lc-spcol-mdl-prints-0002.tif', title: 'DE LA LAFAYETTE', description: '', 'subject.lcsh': 'Lafayette, Marie Joseph Paul Yves Roch Gilbert Du Motier, marquis de, 1757-1834 -- Portraits', 'format.medium': 'line engraving', source: source },
	{ filename: 'lc-spcol-mdl-prints-0003.tif', title: 'LA FAYETTE', description: '', 'subject.lcsh': 'Lafayette, Marie Joseph Paul Yves Roch Gilbert Du Motier, marquis de, 1757-1834 -- Portraits', 'format.medium': 'lithograph', source: source },
	{ filename: 'lc-spcol-mdl-prints-0004.tif', title: 'LA FAYETTE', description: 'Same as I.3 but a later state with slightly different typography in title, etc.', 'subject.lcsh': 'Lafayette, Marie Joseph Paul Yves Roch Gilbert Du Motier, marquis de, 1757-1834 -- Portraits', 'format.medium': 'lithograph', source: source },
	{ filename: 'lc-spcol-mdl-prints-0005.tif', title: 'GENERAL WASHINGTON', description: 'Print depicts Lafayette, not Washington.', 'subject.lcsh': 'Lafayette, Marie Joseph Paul Yves Roch Gilbert Du Motier, marquis de, 1757-1834 -- Portraits', 'format.medium': 'lithograph', source: source },
]

const fields = [
	'filename', 'title', 'subject.lcsh', 'format.medium', 'source'
]

storiesOf('TableEditorContainer', module)
	.add('u basic', () => (
		<TableEditorContainer
			data={exampleValues}
			fields={fields}
		/>
	))
