'use strict'

import React from 'react'
import EditableTableCell from './EditableTableCell'

const T = React.PropTypes
const inArray = (val, arr) => (!!(arr.length && arr.indexOf(val) > -1))

const TableEditor = React.createClass({
	propTypes: {
		activeCells: T.array.isRequired,
		headings: T.array.isRequired,
		data: T.array.isRequired,

		onCellCancel: T.func.isRequired,
		onCellClick: T.func.isRequired,
		onCellSubmit: T.func.isRequired,

		disabledKeys: T.array,

		cellPlaceholder: T.string,

		style: T.object,
	},

	getDefaultProps: function () {
		return {
			cellPlaceholder: '',
			disabledKeys: [],
			style: {
				table: {},
				thead: {},
				tbody: {},
				cell: {},
			},
		}
	},

	handleCellCancel: function (cellNumber, index, key, value) {
		this.props.onCellCancel.apply(null, arguments)
	},

	handleCellClick: function (cellNumber, editing) {
		this.props.onCellClick.apply(null, arguments)
	},

	handleCellSubmit: function (cellNumber, index, key, value) {
		this.props.onCellSubmit.apply(null, arguments)
	},

	mapDataToRows: function () {
		const active = this.props.activeCells
		const vals = this.props.data
		const disabledKeys = this.props.disabledKeys
		let counter = 0

		return vals.map((row, idx) => {
			const keys = Object.keys(row)
			const children = this.props.headings.map(k => {
				const num = counter++
				const editing = inArray(num, this.props.activeCells)
				const disabled = inArray(k, this.props.disabledKeys)

				return (
					<EditableTableCell
						disabled={disabled}
						editing={editing}
						key={num}
						onCancel={this.handleCellCancel.bind(null, num, idx, k)}
						onClick={this.handleCellClick.bind(null, num, idx, k)}
						onSubmit={this.handleCellSubmit.bind(null, num, idx, k)}
						placeholder={this.props.cellPlaceholder}
						value={row[k]}
					/>
				)
			})

			return <tr key={'row'+idx}>{children}</tr>
		})
	},

	render: function () {
		return (
		<table>
			<thead>
				<tr>
					{this.props.headings.map(h => <th key={h}>{h}</th>)}
				</tr>
			</thead>
			<tbody>
				{this.mapDataToRows()}
			</tbody>
		</table>
		)
	}
})

export default TableEditor
