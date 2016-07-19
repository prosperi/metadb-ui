// TODO
// ----
// gonna have to return to this one when we actually have a metada schema!

'use strict'
import React from 'react'

import TableEditor from './table-editor/TableEditor.jsx'
import TableEditorFieldset from './table-editor/TableEditorFieldset.jsx'

const T = React.PropTypes

const TableEditorContainer = React.createClass({
	propTypes: {
		// an array of objects representing data
		data: T.array.isRequired,

		// schema metadata used to render fieldset toggles
		// expects an object w/ shape:
		// { 'legend': [field1, field2, field3, ...] }
		fields: T.object.isRequired,

		maxActiveCells: T.number,
		preserveFieldsOrder: T.bool,
		useFieldsKeyAsLegend: T.bool,
	},

	getDefaultProps: function () {
		return {
			maxActiveCells: 1,
			preserveFieldsOrder: true,
			useFieldKeysAsLegends: true,
		}
	},

	getInitialState: function () {
		return {
			activeCells: [],
			selectedFields: [],
			data: this.props.data,
		}
	},

	handleOnClick: function (num) {
		const update = [].concat(this.state.activeCells, num)

		while (update.length > this.props.maxActiveCells) 
			update.shift()

		this.setState({activeCells: update})
	},

	handleOnCancel: function (num) {
		const active = this.state.activeCells
		const update = removeValueFromArray(num, active)
		
		this.setState({activeCells: update})
	},

	handleOnSubmit: function (num, idx, key, val) {
		const data = [...this.state.data]
		data[idx][key] = val

		const updateActive = removeValueFromArray(num, this.state.activeCells)
		this.setState({
			activeCells: updateActive,
			values: data,
		})
	},

	handleFieldToggle: function (legend, name, checked) {
		// splitting object handling from array handling
		if (legend)
			return this.handleScopedFieldToggle.apply(null, arguments)

		let copy = [...this.state.selectedFields]

		if (checked) {
			copy.push(name)

			if (this.props.preserveFieldsOrder) {
				const fields = this.props.fields

				copy = copy.sort((a,b) => {
					return fields.indexOf(a) > fields.indexOf(b)
				})
			}
		} else {
			copy = copy.filter(n => n !== name)
		}

		this.setState({selectedFields: copy})
	},

	// if we've got multiple fields, we store the selectedFields in an object
	handleScopedFieldToggle: function (legend, name, checked) {
		let copy = {...this.state.selectedFields}

		if (checked) {
			copy[legend].push(name)

			if (this.props.preserveFieldsOrder) {
				const fields = this.props.fields

				copy[legend] = copy[legend].sort((a,b) => {
					return fields.indexOf(a) > fields.indexOf(b) ? 1 : -1
				})
			}
		} else {
			copy[legend] = copy[legend].filter(n => n && n !== name)
		}

		this.setState({selectedFields: copy})
	},

	renderFields: function () {
		return (
			<TableEditorFieldset
				onChange={this.handleFieldToggle}
				fields={this.props.fields}
				selectedFields={this.state.selectedFields}
			/>
		)
	},

	renderEditor: function () {
		return (
			<TableEditor
				activeCells={this.state.activeCells}
				disabledKeys={['filename']}
				headings={this.state.selectedFields}
				cellPlaceholder="[Intentionally Blank]"
				values={this.state.data}
				onCellClick={this.handleOnClick}
				onCellCancel={this.handleOnCancel}
				onCellSubmit={this.handleOnSubmit}
			/>
		)
	},

	render: function () {
		return (
		<div>
			{this.renderFields()}
			{this.state.selectedFields.length ? this.renderEditor() : ''}
		</div>
		)	
	}
})

export default TableEditorContainer

