import React from 'react'
import Modal from 'react-modal'
import xhr from 'xhr'
import assign from 'object-assign'

import FormElementContainer from '../FormElementContainer.jsx'
import TextInput from '../form-elements/TextInput.jsx'

import TagList from '../tags/TagList.jsx'

const T = React.PropTypes

const ExampleTermEditor = React.createClass({
	componentDidMount: function () {
		const url = `https://concerns.stage.lafayette.edu/vocabularies/testVocab.json`

		xhr.get(url, (err, _ , body) => {
			let parsed

			try {
				parsed = JSON.parse(body)
			} catch (e) {return}

			this.setState({
				terms: parsed.terms
			})
		})
	},


	getInitialState: function () {
		return {
			bulkModalOpen: false,
			termModalOpen: false,
			terms: []
		}
	},

	createTerm: function (val) {
		if (!val)
			return

		const term = this.findTerm(val)

		if (term)
			return term

		return {
			uri: '',
			alt_label: [],
			hidden_label: [],
			pref_label: [val],
			label: [val],
		}
	},

	findTerm: function (val) {
		const terms = this.state.terms
		const idx = terms.findIndex(t => (
			t.pref_label.indexOf(val) > -1
		))

		if (idx === -1)
			return

		return terms[idx]
	},

	handleBulkEntry: function () {
		this.setState({
			bulkModalOpen: true,
		})
	},

	handleTermSubmit: function (ev) {
		ev.preventDefault()

		const val = this._input.value

		this._input.value = ''

		this.setState({
			terms: [].concat(
				this.state.terms,
				this.createTerm(val)
			),
		})
	},

	mapTermsToTags: function () {
		return (
			<TagList
				className="terms"
				onTagClick={this.toggleTermModal}
				onTagRemove={this.removeTag}
				tagClassName="vocabulary-term"
				tags={this.state.terms.map(t => t.pref_label[0])}
			/>
		)
	},

	removeTag: function (val) {
		const terms = this.state.terms
		const idx = terms.findIndex(term => (
			term.pref_label.indexOf(val) > -1
		))

		if (idx > -1) {
			this.setState({
				terms: [].concat(
					terms.slice(0, idx),
					terms.slice(idx + 1)
				)
			})
		}
	},

	renderBulkModal: function () {
		let input

		const closeModal = () => {
			input = null
			this.setState({bulkModalOpen: false})
		}

		const submitInput = (ev) => {
			ev.preventDefault()

			const prefLabels = input.value.trim().split('\n')
			const terms = prefLabels.map(this.createTerm).filter(t => t)

			closeModal()
		}

		const val = this.state.terms.reduce((prev, curr) => (
			prev + curr.pref_label[0] + '\n'
		), '')

		return (
			<Modal
				isOpen={true}
				onAfterOpen={() => input.focus()}
				onRequestClose={closeModal}
				>

				<h2 style={{fontWeight: '100'}}>
					Enter terms for
					<span style={{fontWeight:'bold'}}> testVocab</span>
				</h2>

				<textarea
					autoFocus={true}
					defaultValue={val}
					ref={e => input = e}
					style={{
						height: '25em',
						width: '100%',
					}}
				/>

				<button onClick={submitInput}>
					add terms
				</button>
			</Modal>
		)
	},

	renderTermModal: function (val) {
		const term = this.state.termModal
		const termKeys = Object.keys(term)
		const closeTermModal = () => {
			this.setState({
				termModal: null,
			})
		}

		const addValueField = (key) => {
			const copy = assign({}, term)
			copy[key].push('')

			return this.setState({
				termModal: copy
			})
		}

		const onChange = (key, index, val) => {
			const copy = assign({}, term)
			copy[key][index] = val

			return this.setState({
				termModal: copy
			})
		}

		const removeValueField = (key, index) => {
			const copy = assign({}, term)
			copy[key] = [].concat(
				copy[key].slice(0, index),
				copy[key].slice(index + 1)
			)

			return this.setState({
				termModal: copy
			})
		}

		const renderField = (field, index) => {
			const vals = term[field]

			const containerOpts = {
				key: field,
				label: field,
				onAddValueField: addValueField.bind(null, field),
				onChange: onChange.bind(null, field),
				onRemoveValueField: removeValueField.bind(null, field),
			}

			if (!vals.length)
				vals.push('')

			return (
				<FormElementContainer {...containerOpts}>
					{vals.map((val, index) => (
						<TextInput key={field+index+(val||'empty')} value={val} />
					))}
				</FormElementContainer>
			)
		}

		const renderReadOnly = (field, index) => {
			return (
				<FormElementContainer
					key={field}
					label={field}
					multipleValues={false}
					>
					<TextInput
						inputProps={{disabled: true}}
						value={term[field]}
					/>
				</FormElementContainer>
			)
		}

		const renderSelect = () => {
			const keys = Object.keys(term)
			const sel = term.pref_label[0] || ''

			const vals = []

			keys.forEach((key) => {
				if (key === 'uri') return
				if (key === 'pref_label') return

				term[key].forEach(v => {
					if (v === '') return
					vals.push(v)
				})
			})

			const onChange = ev => {
				const val = ev.target.value

				if (val === term.pref_label[0])
					return

				const copy = assign({}, term)
				copy.pref_label[0] = val

				this.setState({
					termModal: copy,
				})
			}

			return (
				<FormElementContainer
					key={'pref_label'}
					label={'pref_label'}
					multipleValues={false}
				>
					<select onChange={onChange} value={sel}>
						{vals.map((v, i) => (
							<option value={v} key={'select'+i}>
								{v}
							</option>
						))}
					</select>
				</FormElementContainer>
			)
		}

		const saveForm = ev => {
			ev.preventDefault()

			const termsCopy = [].concat(this.state.terms)
			const idx = termsCopy.findIndex(t => t.pref_label.indexOf(val) > -1)

			termsCopy[idx] = this.state.termModal

			this.setState({
				terms: termsCopy,
				termModal: null,
			})
		}

		return (
			<Modal
				isOpen={true}
				onAfterOpen={() => {}}
				onRequestClose={closeTermModal}
			>
				<h2>Edit term</h2>

				<form onSubmit={saveForm}>
					{termKeys.map((key, index) => {
						if (key === 'pref_label') return
						if (key === 'uri') 
							return renderReadOnly(key, index)

						return renderField(key, index)
					})}
					
					{renderSelect()}

					<button>
						save term
					</button>
				</form>
			</Modal>
		)
	},

	showDebug: function () {
		if (!this.state.debug)
			return

		return (
			<pre style={{backgroundColor: '#efffef'}}>
				{JSON.stringify(this.state.terms, true, 2)}
			</pre>
		)
	},

	toggleTermModal: function (term) {
		this.setState({
			termModal: this.findTerm(term)
		})
	},

	render: function () {
		const containerStyle = {
			boxShadow: '0 0 2px 1px #aaa',
			width: '50em',
		}

		const footerStyle = {
			backgroundColor: '#efefef',
			marginTop: '1em',
			padding: '10px',
			width: '100%',
		}

		const formStyle = {
			display: 'inline-block',
		}

		const bulkBtn = {
			backgroundColor: '#4ea8d8',
			border: '2px solid #23739d',
			borderRadius: '2px',
			clear: 'both',
			color: '#fff',
			cursor: 'pointer',
			float: 'right',
			fontSize: '.9em',
			WebkitAppearance: 'none',
		}

		return (
			<div className="term-editor-container">
				<div className="term-editor" style={containerStyle}>

					{this.mapTermsToTags()}

					<footer style={footerStyle}>
						<form
							onSubmit={this.handleTermSubmit}
							style={formStyle}
							>
							<input
								ref={e => this._input = e}
								placeholder="Enter terms"
								style={{width: '25em'}}
								type="text"
							/>
						</form>

						<button style={bulkBtn} onClick={this.handleBulkEntry}>
							+ Bulk add terms
						</button>
					</footer>
				</div>

				<div style={{marginTop: '2em'}}>
					<label>
						<input
							defaultChecked={this.state.debug}
							onChange={e => this.setState({debug: !!e.target.checked})}
							type="checkbox"
						/>
						Show debug?
					</label>
				</div>

				{this.showDebug()}

				{this.state.bulkModalOpen ? this.renderBulkModal() : ''}
				{this.state.termModal ? this.renderTermModal() : ''}
			</div>
		)
	}
})

export default ExampleTermEditor
