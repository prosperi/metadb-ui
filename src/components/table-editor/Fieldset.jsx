import React from 'react'

const T = React.PropTypes

const TableEditorFieldset = React.createClass({
	propTypes: {
		fields: T.array.isRequired,
		selectedFields: T.oneOfType([T.array, T.object]).isRequired,
		onChange: T.func.isRequired,

		disabled: T.bool,
		legend: T.string,
		maxSelectedFields: T.number,
	},

	getDefaultProps: function () {
		return {
			disabled: false,
			legend: null,
			maxSelectedFields: Infinity,
			style: {
				container: {},
				legend: {},
				list: {
					listStyleType: 'none',
					padding: '0'
				},
				label: {},
			}
		}
	},

	// handles array vs object
	handleRenderFields: function () {
		const fields = this.props.fields

		if (Array.isArray(fields))
			return this.renderFields(fields)

		return Object.keys(fields).map(k => this.renderFields(k, fields[k]))
	},

	handleToggle: function (legend, ev) {
		const target = ev.target
		return this.props.onChange(legend, target.name, target.checked)
	},

	render: function () {
		const fields = this.props.fields
		const selectedFields = this.props.selectedFields
		const atMaxFields = selectedFields.length >= this.props.maxSelectedFields
		const legend = this.props.legend
		const style = this.props.style

		return (
		<div className="table-editor-fields-container" onChange={this.handleToggle}>
			{legend ? <h4 style={style.legend}>{legend}</h4> : ''}
			<ul style={style.list}>
				{fields.map(field => {
					const isSelected = selectedFields.indexOf(field) > -1
					return (
					<li key={'li'+field}>
						<label style={style.label}>
							<input
								checked={isSelected}
								disabled={
									this.props.disabled ? true 
									: (atMaxFields && !isSelected) 
									? true : false
								}
								name={field}
								key={field}
								type="checkbox"
							/>
							{field}
						</label>
					</li>
					)
				})}
			</ul>
		</div>
		)
	}
})

export default TableEditorFieldset
