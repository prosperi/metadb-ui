import React from 'react'

// vocab side
import VocabularyList from '../components/vocabulary/VocabularyList.jsx'
import CreateVocabularyModal from '../components/vocabulary/CreateVocabularyModal.jsx'

// active vocabulary / terms side
import TermsManager from '../components/vocabulary/TermsManager.jsx'

const T = React.PropTypes
const VOCAB_LABEL_KEY = 'pref_label'

const VocabularyManager = React.createClass({
	propTypes: {

	},

	getInitialState: function () {
		return {
			activeVocabulary: null,
			activeVocabularyIndex: -1,

			addVocabularyModalOpen: false,
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

	handleCloseAddVocabularyModal: function () {
		this.setState({
			addVocabularyModalOpen: false,
		})
	},

	handleCreateVocabulary: function (data) {
		this.handleCloseAddVocabularyModal()

		this.props.createVocabulary.call(null, data)
	},

	handleOpenAddVocabularyModal: function () {
		this.setState({
			addVocabularyModalOpen: true,
		})
	},

	handleUpdateTermInVocabulary: function (vocabulary, term, data) {
		this.props.updateTermInVocabulary({
			data,
			term,
			vocabulary,
		})
	},

	// sets the `activeVocabulary` prop + fetches terms
	handleVocabularySelect: function (vocabData, index) {
		this.props.fetchTermsFromVocabulary(vocabData)
		this.setState({
			activeVocabulary: vocabData,
			activeVocabularyIndex: index,
		})
	},

	renderAddVocabularyModal: function () {
		if (!this.state.addVocabularyModalOpen)
			return

		return (
			<CreateVocabularyModal
				onClose={this.handleCloseAddVocabularyModal}
				onSubmit={this.handleCreateVocabulary}
			/>
		)
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
				onBulkTermUpdate={this.props.bulkEditTermsInVocabulary.bind(null, activeVocab)}
				onRemoveTerm={this.props.removeTermFromVocabulary.bind(null, activeVocab)}
				onUpdateTerm={this.handleUpdateTermInVocabulary.bind(null, activeVocab)}
				terms={terms.data}
			/>
		)
	},

	renderVocabularyList: function () {
		const vocabs = this.props.vocabularies
		
		if (!vocabs)
			return

		const props = {
			keys: {
				count: 'term_count',
				label: VOCAB_LABEL_KEY,
			},
			onAddVocabulary: this.handleOpenAddVocabularyModal,
			onVocabularyClick: this.handleVocabularySelect,
			placeholder: 'Filter vocabularies',
		}

		if (vocabs.isFetching) {
			return (
				<VocabularyList
					{...props}
					isLoading
				/>
			)
		}

		let activeKey = null

		if (this.state.activeVocabulary)
			activeKey = this.state.activeVocabulary[VOCAB_LABEL_KEY][0]

		return (
			<VocabularyList
				{...props}
				activeIndex={this.state.activeVocabularyIndex}
				activeKey={activeKey}
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

				{this.renderAddVocabularyModal()}
			</div>
		)
	}
})

export default VocabularyManager
