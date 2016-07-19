import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import EditableTableCell from '../EditableTableCell'

const BasicTable = React.createClass({
	render () {
		return (
		<table>
			<tbody>
				<tr>
					{this.props.children}
				</tr>
			</tbody>
		</table>
		)
	}
})

storiesOf('EditableTableCell', module)
	.add('display', () => (
		<BasicTable>
			<EditableTableCell 
				onClick={action('click!')}
				value="table cell value"
			/>
		</BasicTable>
	))
	.add('editing', () => (
		<BasicTable>
			<EditableTableCell
				editing={true}
				onCancel={action('cancel')}
				onChange={action('change')}
				onClick={action('click!')}
				onSubmit={action('submit')}
				value="table cell value"
			/>
		</BasicTable>
	))

