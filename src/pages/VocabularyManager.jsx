import React from 'react'

import VocabularyList from '../components/vocabulary/VocabularyList.jsx'
import TermsManager from '../components/vocabulary/TermsManager.jsx'

const T = React.PropTypes
const VOCAB_LABEL_KEY = 'label'

const VocabularyManager = React.createClass({
	propTypes: {

	},

	getInitialState: function () {
		return {
			activeVocabulary: null,
			activeVocabularyIndex: -1,
		}
	},

	componentDidMount: function () {
		this.props.fetchAllVocabularies()
	},

	fetchingTerms: function () {
		return <h2>fetching terms...</h2>
	},

	fetchingVocabularies: function () {
		return <h2>fetching...</h2>
	},

	// eventually this will toggle a `New Vocabulary` modal,
	// but for now just `console.log`s a confirmation
	handleAddVocabulary: function () {
		console.log('adding a vocabulary!')
	},


	handleUpdateTermInVocabulary: function (term, termData) {

	},

	// sets the `activeVocabulary` prop + fetches terms
	handleVocabularySelect: function (vocabData, index) {
		this.props.fetchTermsFromVocabulary(vocabData)
		this.setState({
			activeVocabulary: vocabData,
			activeVocabularyIndex: index,
		})
	},

	renderTermsManager: function () {
		const terms = this.props.activeVocabularyTerms
		const activeVocab = this.state.activeVocabulary

		if (!terms || !activeVocab)
			return

		if (terms.isFetching)
			return this.fetchingTerms()

		const vocabName = activeVocab[VOCAB_LABEL_KEY][0]

		return (
			<TermsManager
				label={vocabName}
				onAddTerm={this.props.addTermToVocabulary.bind(null, activeVocab)}
				onRemoveTerm={this.props.removeTermFromVocabulary.bind(null, activeVocab)}
				onUpdateTerm={this.handleUpdateTermInVocabulary}
				terms={terms.data}
			/>
		)
	},

	renderVocabularyList: function () {
		const vocabs = this.props.vocabularies
		
		if (!vocabs)
			return

		if (vocabs.isFetching)
			return this.fetchingVocabularies()

		const vocabKeys = {
			count: 'term_count',
			label: VOCAB_LABEL_KEY,
		}

		let activeKey = null

		if (this.state.activeVocabulary)
			activeKey = this.state.activeVocabulary[VOCAB_LABEL_KEY][0]

		return (
			<VocabularyList
				activeIndex={this.state.activeVocabularyIndex}
				activeKey={activeKey}
				keys={vocabKeys}
				onAddVocabulary={this.handleAddVocabulary}
				onVocabularyClick={this.handleVocabularySelect}
				placeholder={'Filter vocabularies'}
				vocabularies={vocabs.data}
			/>
		)

	},

	render: function () {
		return (
			<div>
				<h1>Vocabulary Management</h1>

				<div className="vocabulary-list-container">
					{this.renderVocabularyList()}
				</div>

				<div className="terms-manager-container">
					{this.renderTermsManager()}
				</div>
			</div>
		)
	}
})

export default VocabularyManager
