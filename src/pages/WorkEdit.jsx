import React from 'react'
import empty from 'is-empty-object'
import store from '../store'

import WorkMetadataForm from '../components/WorkMetadataForm.jsx'

const WorkEdit = React.createClass({
	componentDidMount: function () {
		const id = this.props.params.workId
		this.props.fetchWork(id)
	},

	componentWillUnmount: function () {
		this.props.removeError()
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
		const error = this.props.error
		const hasError = !empty(error)

		// we'll make this prettier later
		if (hasError) {
			const errorStyle = {
				backgroundColor: '#cc092f',
				color: '#fff',
				padding: '10px',
			}

			return (
			<div>
				<div style={errorStyle}>
					<p>There was an error!</p>
					<pre>{error.message}</pre>
				</div>
			</div>
			)
		}

		const ided = <strong>{this.props.params.workId}</strong>
		const work = this.props.selectedWork
		const isFetching = this.props.fetchingWork

		return (
		<div>
			<h1>{work.title || 'loading'}</h1>
			<strong>status: {isFetching ? 'fetching' : work ? 'fetched!' : ':shrug:'}</strong>
			{!empty(work) ? this.renderEditForm() : ''}
		</div>
		)
	}
})

export default WorkEdit
