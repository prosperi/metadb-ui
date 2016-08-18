import React from 'react'
import withRouter from 'react-router/lib/withRouter'
import assign from 'object-assign'

import WorkMetadataForm from '../components/WorkMetadataForm.jsx'

const Work = React.createClass({
	componentDidMount: function () {
		const id = this.props.params.workId

		if (!id) {
			// handle no id
		}

		this.props.fetchWork(id)
		this.props.router.setRouteLeaveHook(this.props.route, this.onExit)

		document.addEventListener('scroll', this.handleScroll)
	},

	componentWillUnmount: function () {
		this.props.removeError()
		this.props.removeWork()

		document.removeEventListener('scroll', this.handleScroll)
	},

	onExit: function (nextLocation) {
		if (this.props.work.updated)
			return 'Any unsaved changes will be lost. Are you sure?'
	},


	getInitialState: function () {
		return {
			mediaOpen: false
		}
	},

	adjustSections: function (ev) {
		this.setState({mediaOpen: !this.state.mediaOpen})
	},

	handleAddValueField: function (which) {
		console.log('adding value field to', which)
		this.props.addValueField.apply(null, arguments)
	},

	handleRemoveValueField: function (which, index) {
		console.log(`removing value field [idx:${index}] from ${which}`)
		this.props.removeValueField.apply(null, arguments)
	},

	handleChange: function (key, index, value) {
		console.log('making change [${value}] to key [${key}] @ idx ${index}')
		this.props.editWorkField.apply(null, arguments)
	},

	handleFormSubmit: function () {
		this.props.saveWork()

		const interval = setInterval(function () {
			if (window.pageYOffset <= 0) return clearInterval(interval)
			window.scrollTo(0, window.pageYOffset - 75)
		}, 1)
	},

	mediaPreviewSide: function () {
		const initStyle = {
			backgroundColor: '#f42069',
			display: 'table-cell',
			transition: 'width 500ms ease-out',
			width: (this.state.mediaOpen ? '66%' : '33%'),
		}

		return (
			<div style={initStyle}>
				{
					this.state.mediaOpen
					? <h2>OpEn SeAdRaGoN!!</h2>
					: <h2>MeDiA pReViEw</h2>
				}
			</div>
		)
	},

	workEditSide: function () {
		const work = this.props.work

		if (work.isFetching || !Object.keys(work.data).length)
			return

		const workData = work.data
		const updates = work.updates
		const schema = workData.form

		return (
			<WorkMetadataForm
				fetchVocabulary={() => {}}
				data={assign({}, workData, updates)}
				onAddValueField={this.handleAddValueField}
				onRemoveValueField={this.handleRemoveValueField}
				onChange={this.handleChange}
				onSubmit={this.handleFormSubmit}
				schema={schema}
			/>
		)
	},

	renderHeader: function () {
		const work = this.props.work
		let title

		if (work.isFetching || !Object.keys(work.data))
			title = 'fetching...'
		else
			title = work.data.title || work.data.id

		const base = `${process.env.API_BASE_URL}/concern/generic_works`
		const debugUrl = `${base}/${this.props.params.workId}.json`

		return (
			<header>
				<h1 style={{display: 'inline-block'}}>{title}</h1>
				
				<a 
					href={debugUrl}
					style={{
						fontFamily: 'monospace',
						margin: '0 1em',
					}}
					target="_blank"
					>(debug)</a>

				<button onClick={this.adjustSections}>click slowly + see</button>
			</header>
		)
	},

	render: function () {
		const workSpaceStyle = {
			display: 'table',
			tableLayout: 'fixed',
			width: '100%',
		}

		const workEditStyle = {
			display: 'table-cell',
			verticalAlign: 'top',
		}

		const mediaPreviewStyle = {
			backgroundColor: '#f42069',
			display: 'table-cell',
			transition: 'width 250ms ease-in',
			verticalAlign: 'top',
			width: (this.state.mediaOpen ? '66%' : '33%'),
		}

		return (
			<div>
				{this.renderHeader()}

				<div style={workSpaceStyle} className="work-space">

					<div style={workEditStyle} ref={e => this._workEditEl = e}>
						{this.workEditSide()}
					</div>

					<div style={mediaPreviewStyle} ref={e =>this._mediaPreviewEl = e}>
						{this.mediaPreviewSide()}
					</div>

				</div>
			</div>
		)
	}
})

export default withRouter(Work)
