import React from 'react'
import Modal from 'react-modal'
import TagList from '../tags/TagList.jsx'
import TermEditModal from './TermEditModal.jsx'
import shallowCompare from 'react-addons-shallow-compare'

const T = React.PropTypes

const TermsManager = React.createClass({
	propTypes: {
		label: T.string.isRequired,
		terms: T.array.isRequired,

		onAddTerm: T.func.isRequired,
		onRemoveTerm: T.func.isRequired,
		onUpdateTerm: T.func.isRequired,
	},

	componentDidMount: function () {
		this._index = this.indexTerms()
	},

	componentDidUpdate: function (prevProps) {
		// if we added/removed terms, reindex the lot so we have fresh data
		if (prevProps.terms.length !== this.props.terms.length) 
			this._index = this.indexTerms()
	},

	shouldComponentUpdate: function (nextProps, nextState) {
		return shallowCompare(nextProps, nextState)
	},

	getInitialState: function () {
		return {
			activeEditingTerm: null,
		}
	},

	handleInputKeyDown: function (ev) {
		if (ev.keyCode !== 13)
			return

		const val = ev.target.value

		this.props.onAddTerm.call(null, val)

		ev.target.value = ''
	},

	handleTermAddValueField: function (term, key) {
		this.props.onTermAddValueField.apply(null, arguments)
	},

	handleTermClick: function (term) {
		this.setState({
			activeEditingTerm: term,
		})
	},

	handleTermModalClose: function () {
		this.setState({
			activeEditingTerm: null,
		})
	},

	handleTermRemove: function (/* term, index */) {
		this.props.onRemoveTerm.apply(null, arguments)
	},

	// `term` is the original pref_label
	// `data` is the updated term object
	handleTermSave: function (term, data) {
		this.props.onUpdateTerm.call(null, term, data)
	},

	indexTerms: function () {
		const index = {}
		this.props.terms.forEach(t => index[t.pref_label[0]] = t)

		return index
	},

	mapTermPrefLabels: function (terms) {
		return terms.map(t => t.pref_label[0])
	},

	renderTermModal: function () {
		const active = this.state.activeEditingTerm

		if (!active)
			return

		const data = this._index[active]

		return (
			<TermEditModal
				data={data}
				onClose={this.handleTermModalClose}
				onSave={this.handleTermSave.bind(null, active)}
			/>
		)
	},

	renderTermTagList: function () {
		if (!this.props.terms.length) {
			// render a 'No terms!' div instead
			return 
		}

		return (
			<TagList
				className="terms"
				onClickTag={this.handleTermClick}
				onRemoveTag={this.handleTermRemove}
				tagClassName="vocabulary-term"
				tags={this.mapTermPrefLabels(this.props.terms)}
			/>
		)
	},

	render: function () {
		return (
			<div className="term-editor">
				<header>
					Viewing terms for <strong>{this.props.label}</strong>
				</header>

				<section className="term-tag-list">
					{this.renderTermTagList()}
				</section>

				<footer>
					<input
						onKeyDown={this.handleInputKeyDown}
						placeholder="Add new term"
						type="text"
					/>
				</footer>

				{this.renderTermModal()}
			</div>
		)
	}
})

export default TermsManager
