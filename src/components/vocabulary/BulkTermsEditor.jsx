import React from 'react'
import Dropzone from 'react-dropzone'

const T = React.PropTypes

const BulkTermsEditor = React.createClass({
	propTypes: {
		autofocus: T.bool,
		terms: T.arrayOf(T.string),
	},

	getDefaultProps: function () {
		return {
			autofocus: true,
			terms: [],
		}
	},

	getInitialState: function () {
		const terms = this.props.terms
		const raw = terms.length ? terms.join('\n') : ''

		return {
			appendFile: false,
			loadingFile: false,
			raw,
		}
	},

	componentDidMount: function () {
		if (this._textarea && this.props.autofocus)
			this._textarea.focus()
	},

	handleChange: function (ev) {
		this.setState({raw: ev.target.value})
	},

	handleFileDrop: function (files) {
		const reader = new FileReader()
		
		reader.onloadstart = () => {
			this.setState({
				loadingFile: true,
			})
		}

		reader.onloadend = (ev) => {
			const result = ev.target.result.trim()
			const original = this.state.raw.trim()
			const append = this.state.appendFile

			this.setState({
				loadingFile: false,
				raw: append ? `${original}\n${result}\n` : `${result}\n`
			})
		}

		reader.readAsText(files[0])
	},

	handleSubmit: function (ev) {
		ev.preventDefault()

		// filter to remove any blank lines in the terms
		console.log(this.state.terms.filter(t => t))
	},

	render: function () {
		const txtStyle = {
			display: 'inline-block',
			height: '15em',
			width: '25em',
		}

		const btnStyle = {
			display: 'block',
		}

		return (
			<div>
				<Dropzone
					accept={'text/plain'}
					disableClick={true}
					multiple={false}
					onDrop={this.handleFileDrop}
				>
					<textarea
						onChange={this.handleChange}
						ref={e => this._textarea = e}
						style={txtStyle}
						value={this.state.raw}
					/>
				</Dropzone>

				<button onClick={this.handleSubmit} style={btnStyle}>
					Add Terms 
				</button>
			</div>
		)
	}
})

export default BulkTermsEditor
