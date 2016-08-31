'use strict'

import React from 'react'

import VocabularyList from '../components/vocabulary/VocabularyList.jsx'
import TermsEditor from '../components/vocabulary/TermsEditor.jsx'

const VocabularyPage = React.createClass({
	componentDidMount: function () {
		this.props.fetchAllVocabularies()
	},

	getInitialState: function () {
		return {
			activeVocabulary: null,
		}
	},

	handleAddVocabulary: function () {
		console.log('addin a vocabulary')
	},

	handleAddTerm: function (val) {
		if (!this.props.activeVocabulary)
			return

		this.props.addTermToVocabulary({
			uri: this.props.activeVocabulary,
			term: val,
		})
	},

	handleRemoveTerm: function (val) {

	},

	handleTermUpdate: function (term, data) {
		if (!this.props.activeVocabulary)
			return

		this.props.updateTermInVocabulary({
			uri: this.props.activeVocabulary,
			term,
			data,
		})
	},

	handleVocabularyClick: function (data) {
		const uri = data.uri

		this.setState({
			activeVocabulary: uri,
		})

		this.props.fetchTerms(data)
	},

	renderTermList: function () {
		const active = this.state.activeVocabulary

		if (!active)
			return

		// assume fetching
		if (!this.props.terms[active]) {
			console.log('no terms!')
			return
		}

		if (this.props.terms[active].isFetching) {
			return <h2>fetching...</h2>
		}

		const vocab = this.props.vocabulary.data[active]
		const terms = this.props.terms[active].data
		
		return (
			<TermsEditor
				label={vocab.label[0]}
				onAddTerm={this.handleAddTerm}
				onRemoveTerm={this.handleRemoveTerm}
				onUpdateTerm={this.handleUpdateTerm}
				terms={terms}
			/>
		)
	},

	renderVocabularyList: function () {
		if (this.props.vocabulary.isFetching)
			return <h2>fetching...</h2>
		
		const keys = {
			count: 'term_count',
			label: 'label',
		}

		const vocabularies = []
		let v, data

		for (v in this.props.vocabulary.data) {

			// skip odd uris for now
			if (v[0] && v[0] === '_') 
				continue

			vocabularies.push(this.props.vocabulary.data[v])
		}

		const props = {
			keys,
			onAddVocabulary: this.handleAddVocabulary,
			onVocabularyClick: this.handleVocabularyClick,
			placeholder: 'filter vocabularies',
			vocabularies,
		}

		return <VocabularyList {...props} />
	},

	render: function () {
		return (
			<div>
				<h1>Vocabulary Management</h1>
				<div className="vocabulary-list-container">
					{this.renderVocabularyList()}
				</div>

				<div className="term-list-container">
					{this.renderTermList()}
				</div>

			</div>
		)
	}
})

export default VocabularyPage
