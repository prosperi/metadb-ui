import React from 'react'
import assign from 'object-assign'

// vocab side
import VocabularyList from '../components/vocabulary/VocabularyList.jsx'
import CreateVocabularyModal from '../components/vocabulary/CreateVocabularyModal.jsx'

// active vocabulary / terms side
import TermsManager from '../components/vocabulary/TermsManager.jsx'
import BulkTermsEditModal from '../components/vocabulary/BulkTermsEditModal.jsx'

const T = React.PropTypes
const VOCAB_LABEL_KEY = 'pref_label'

const MODAL = {
	ADD_VOCABULARY: 'addVocabulary',
	BULK_TERMS: 'bulkTerms',
}

const VocabularyManager = React.createClass({
	propTypes: {

	},

	getInitialState: function () {
		return {
			activeVocabulary: null,
			activeVocabularyIndex: -1,

			// modal window management
			modals: {
				addVocabulary: false,
				bulkTerms: false,
			},
		}
	},

	componentDidMount: function () {
		this.props.fetchAllVocabularies()
	},

	closeModal: function (which) {
		this.toggleModal(which, false)
	},

	fetchingTerms: function () {
		return <h2>fetching terms...</h2>
	},

	handleCloseAddVocabularyModal: function () {
		this.closeModal(MODAL.ADD_VOCABULARY)
	},

	handleCreateVocabulary: function (data) {
		this.handleCloseAddVocabularyModal()

		this.props.createVocabulary.call(null, data)
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

	openModal: function (which) {
		this.toggleModal(which, true)
	},

	renderAddVocabularyModal: function () {
		if (!this.state.modals[MODAL.ADD_VOCABULARY])
			return

		return (
			<CreateVocabularyModal
				onClose={this.closeModal.bind(null, MODAL.ADD_VOCABULARY)}
				onSubmit={this.handleCreateVocabulary}
			/>
		)
	},

	renderBulkTermsModal: function () {
		if (!this.state.modals[MODAL.BULK_TERMS])
			return

		const activeVocab = this.state.activeVocabulary
		const activeTerms = this.props.activeVocabularyTerms

		// we might want to also close the bulk modal if it's been opened
		// without an activeVocabulary selected
		if (!activeVocab)
			return

		const props = {
			label: activeVocab[VOCAB_LABEL_KEY][0],
			onClose: this.closeModal.bind(null, MODAL.BULK_TERMS),
			onSubmit: this.props.bulkEditTermsInVocabulary.bind(null, activeVocab),
			terms: activeTerms.data.map(term => term.pref_label[0]),
		}

		return React.createElement(BulkTermsEditModal, props)
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
				onBulkTermsOpen={this.openModal.bind(null, MODAL.BULK_TERMS)}
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

		// required + common props
		const props = {
			keys: {
				count: 'term_count',
				label: VOCAB_LABEL_KEY,
			},
			onAddVocabulary: this.openModal.bind(null, MODAL.ADD_VOCABULARY),
			onVocabularyClick: this.handleVocabularySelect,
			placeholder: 'Filter vocabularies',
		}

		if (!vocabs.isFetching) {
			let activeKey = null

			if (this.state.activeVocabulary)
				activeKey = this.state.activeVocabulary[VOCAB_LABEL_KEY][0]

			props.activeKey = activeKey
			props.activeIndex = this.state.activeVocabularyIndex
			props.vocabularies = vocabs.data
		} 

		else props.isLoading = true

		return React.createElement(VocabularyList, props)
	},

	toggleModal: function (which, toggle) {
		if (typeof toggle !== 'boolean')
			toggle = !!toggle

		const modals = assign({}, this.state.modals)

		if (typeof modals[which] === 'undefined')
			return

		// reset all modals to false
		for (let m in modals)
			modals[m] = false

		if (toggle === true)
			modals[which] = true

		this.setState({modals})
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
				{this.renderBulkTermsModal()}
			</div>
		)
	}
})

export default VocabularyManager
