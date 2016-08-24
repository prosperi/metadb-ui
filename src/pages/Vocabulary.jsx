'use strict'

import React from 'react'

import VocabularyList from '../components/vocabulary/VocabularyList.jsx'
import TermEdit from '../components/vocabulary/TermEdit.jsx'

import FormFieldsFromDataObject from '../components/FormFieldsFromDataObject.jsx'

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

	handleVocabularyClick: function (data) {
		const uri = data.uri

		this.setState({
			activeVocabulary: uri
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

		return (
			<form onSubmit={e => e.preventDefault()}>
				<FormFieldsFromDataObject
					data={vocab}
					ignoreKeys={['terms']}
					onAddValueField={console.log}
					onChange={console.log}
					onRemoveValueField={console.log}
				/>
			</form>
		)		

		// return (
		// 	<div style={{
		// 		display: 'inline-block',
		// 		float: 'right',
		// 		verticalAlign: 'top',
		// 		width: '66%'
		// 	}}>
		// 		<TermEdit
		// 			displayKey="label"
		// 			terms={this.props.terms[active].data}
		// 		/>
		// 	</div>
		// )
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

		return (
			<div style={{display: 'inline-block', width: '25%'}}>
				<VocabularyList {...props} />
			</div>
		)

	},

	render: function () {
		return (
			<div>
				<h1>the vocab page!</h1>
				
				{this.renderVocabularyList()}

				{this.renderTermList()}

			</div>
		)
	}
})

export default VocabularyPage
