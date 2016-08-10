import React from 'react'
import empty from 'is-empty-object'
import assign from 'object-assign'
import store from '../store'

import WorkMetadataForm from '../components/WorkMetadataForm.jsx'
import MediaPreview from '../components/MediaPreview.jsx'

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
		console.log()
		this.props.editWorkField.apply(null, arguments)
	},

	handleFormSubmit: function () {
		this.props.saveWork()

		const interval = setInterval(function () {
			if (window.pageYOffset <= 0) return clearInterval(interval)
			window.scrollTo(0, window.pageYOffset - 75)
		}, 1)
		
	},

	onExit: function (nextLocation) {
		if (this.props.work.updated)
			return 'Any unsaved changes will be lost. Are you sure?'
	},

	renderEditForm: function () {
		const work = this.props.work
		const workData = work.data
		const schema = workData.form

		return (
			<div className="work-metadata-edit">
				<MediaPreview
					thumbnailUrl={'https://sporades0.stage.lafayette.edu'+workData.thumbnail_path}
				/>
				<WorkMetadataForm
					fetchVocabulary={this.props.fetchVocabulary}
					data={workData}
					onAddValueField={this.handleAddValueField}
					onRemoveValueField={this.handleRemoveValueField}
					onChange={this.handleChange}
					onSubmit={this.handleFormSubmit}
					schema={schema}
					vocabulary={this.props.vocabulary}
				/>
			</div>
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
