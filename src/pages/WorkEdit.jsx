import React from 'react'
import empty from 'is-empty-object'
import assign from 'object-assign'
import store from '../store'

import WorkMetadataForm from '../components/WorkMetadataForm.jsx'
import withRouter from 'react-router/lib/withRouter'
import browserHistory from 'react-router/lib/browserHistory'

const WorkEdit = React.createClass({
	componentDidMount: function () {
		const id = this.props.params.workId
		if (!id) {
			// handle no id
		}

		this.props.fetchWork(id)
		this.props.router.setRouteLeaveHook(this.props.route, this.onExit)
	},

	componentWillUnmount: function () {
		this.props.removeError()
		this.props.removeWork()
	},

	handleAddValueField: function (which) {
		this.props.addValueField(which)
	},

	handleRemoveValueField: function (which, index) {
		this.props.removeValueField(which, index)
	},

	handleChange: function (key, idx, value) {
		this.props.editWorkField.apply(null, arguments)
	},

	handleFormSubmit: function () {
		this.props.saveWork()
	},

	onExit: function (nextLocation) {
		if (this.props.work.updated)
			return 'Any unsaved changes will be lost. Are you sure?'
	},

	renderEditForm: function () {
		const schema = this.props.schema
		const workData = assign({},
			this.props.work.data,
			this.props.work.updates
		)

		return (
		<WorkMetadataForm
			onChange={this.handleChange}
			onAddValueField={this.handleAddValueField}
			onRemoveValueField={this.handleRemoveValueField}
			onSubmit={this.handleFormSubmit}
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

		const title = this.props.work.displayTitle
		const isFetching = this.props.fetchingWork
		const work = this.props.work.data

		return (
		<div>
			<h1>
				{work.title || 'loading'}
				{
					this.props.work.updated 
					? <span className="label label-notice">modified</span>
					: ''
				}
			</h1>

			{!empty(work) ? this.renderEditForm() : ''}
		</div>
		)
	}
})

export default withRouter(WorkEdit)
