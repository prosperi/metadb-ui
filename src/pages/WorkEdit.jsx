import React from 'react'
import empty from 'is-empty-object'
import store from '../store'

import WorkMetadataForm from '../components/WorkMetadataForm.jsx'

const WorkEdit = React.createClass({
	componentDidMount: function () {
		const id = this.props.params.workId
		if (empty(this.props.selectedWork))
			this.props.fetchWork(id)
	},

	componentWillUnmount: function () {
		// this.props.removeWork()
	},

	handleAddValueField: function (which) {
		this.props.addValueField(which)
	},

	handleChange: function (key, idx, value) {
		this.props.editWorkField.apply(null, arguments)
	},

	renderEditForm: function () {
		const schema = this.props.schema
		const workData = this.props.selectedWork

		// console.log('schema', schema)
		// console.log('workData', workData)

		return (
		<WorkMetadataForm
			onChange={this.handleChange}
			onAddValueField={this.handleAddValueField}
			data={workData}
			schema={schema}
		/>
		)
	},

	render: function () {
		const ided = <strong>{this.props.params.workId}</strong>
		const work = this.props.selectedWork
		const isFetching = this.props.fetchingWork

		return (
		<div>
			<h1>{isFetching ? `Let's see if editing works!` : `Editing Works! Isn't this fun?`}</h1>
			<p>Lets see, you wanna edit an item w/ the id of {ided} right?</p>
			<strong>status: {isFetching ? 'fetching' : work ? 'fetched!' : ':shrug:'}</strong>
			{!empty(work) ? this.renderEditForm() : ''}
		</div>
		)
	}
})

export default WorkEdit
