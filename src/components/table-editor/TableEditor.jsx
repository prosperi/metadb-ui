'use strict'

import React from 'react'
import EditableTableCell from './EditableTableCell.jsx'

const T = React.PropTypes
const inArray = (val, arr) => (!!(arr.length && arr.indexOf(val) > -1))

const TableEditor = React.createClass({
	propTypes: {
		headings: T.array.isRequired,
		data: T.array.isRequired,

		onCellCancel: T.func.isRequired,
		onCellClick: T.func.isRequired,
		onCellSubmit: T.func.isRequired,

		disabledKeys: T.array,

		cellPlaceholder: T.string,

		classNames: T.object,
	},

	getDefaultProps: function () {
		return {
			cellPlaceholder: '',
			disabledKeys: [],
			classNames: {
				table: '',
				thead: '',
				tbody: '',
				activeCell: '',
				cell: '',
			}
		}
	},

	getInitialState: function () {
		return {
			activeCells: [],
			data: this.props.data,
		}
	},

	handleCellCancel: function (cellNumber, index, key, value) {
		const ac = this.state.activeCells
		const idx = ac.indexOf(cellNumber)

		if (idx === -1) return

		const sdata = this.state.data
		const pdata = this.props.data

		const updatedActiveCells = [].concat(ac.slice(0, idx), ac.slice(idx + 1))
		const data = [].concat(sdata.slice(0, index), pdata[index], sdata.slice(index + 1))

		this.setState({
			activeCells: [].concat(ac.slice(0, idx), ac.slice(idx + 1)),
			data,
		})

		this.props.onCellCancel.apply(null, arguments)
	},

	handleCellClick: function (cellNumber, editing) {
		this.setState({activeCells: [].concat(this.state.activeCells, cellNumber)})

		this.props.onCellClick.apply(null, arguments)
	},

	handleCellSubmit: function (cellNumber, index, key, value) {
		const ac = this.state.activeCells
		const idx = ac.indexOf(cellNumber)

		const data = this.state.data
		data[index][key] = value

		const updatedActiveCells = [].concat(ac.slice(0, idx), ac.slice(idx + 1))

		this.setState({
			activeCells: [].concat(ac.slice(0, idx), ac.slice(idx + 1)),
			data,
		})

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
				const editing = inArray(num, this.state.activeCells)
				const disabled = inArray(k, this.props.disabledKeys)

				const classname = [this.props.classNames.cell]
				if (editing) classname.push(this.props.classNames.activeCell)

				return (
					<EditableTableCell
						className={classname.join(' ').trim()}
						disabled={disabled}
						editing={editing}
						key={num}
						onCancel={this.handleCellCancel.bind(null, num, idx, k)}
						onClick={this.handleCellClick.bind(null, num, idx, k)}
						onSubmit={this.handleCellSubmit.bind(null, num, idx, k)}
						placeholder={this.props.cellPlaceholder}
						useInput={true}
						value={editing ? this.state.data[idx][k] : row[k]}
					/>
				)
			})

			return <tr key={'row'+idx}>{children}</tr>
		})
	},

	render: function () {
		return (
		<table className={this.props.classNames.table}>
			<thead className={this.props.classNames.thead}>
				<tr>
					{this.props.headings.map(h => <th key={h}>{h}</th>)}
				</tr>
			</thead>
			<tbody className={this.props.classNames.tbody}>
				{this.mapDataToRows()}
			</tbody>
		</table>
		)
	}
})

export default TableEditor
