import React from 'react'

import VocabularyList from '../components/vocabulary/VocabularyList.jsx'
import TermsList from '../components/vocabulary/TermsList.jsx'
import TableEditor from '../components/table-editor/TableEditor.jsx'

import mockVocabularies from '../../data/vocabularies.json'

const Vocabularies = React.createClass({
	componentWillMount: function () {
		document.title = 'Vocab Management!'
	},

	componentWillUnmount: function () {
		document.title = ''
	},

	// getDefaultProps: function () {
		
	// },

	getInitialState: function () {
		const mocked = Object.keys(mockVocabularies).map(k => ({
			uri: `http://authority.lafayette.edu/ns/${k}`,
			label: [k],
			alt_label: [],
			pref_labe: [],
			hidden_label: [],
			relative_path: '',
			terms: mockVocabularies[k].map(t => ({
				uri: `http://authority.lafayette.edu/ns/${k}/${t}`,
				label: [t],
				alt_label: [],
				pref_label: [],
				hidden_label: [],
				relative_path: '',
			})),
		}))

		return {
			vocabularies: mocked,
			terms: [],
		}

		// return {
		// 	// vocabularies: this.props.vocabularies,
		// 	vocabularies: [
		// 		{ 
		// 			uri: 'http://authority.lafayette.edu/ns/testVocab',
		// 			label: ['testVocab'],
		// 			alt_label: [],
		// 			pref_label: [],
		// 			hidden_label: [],
		// 			relative_path: '/vocabularies/testVocab.json',
		// 		},
		// 	],

 	// 		terms: [],
		// }
	},

	handleVocabClick: function (vocab) {
		const vocabs = this.state.vocabularies

		const demoTerms = vocabs.find(v => {
			return v.label.length && v.label[0] === vocab.label[0]
		})
		if (!demoTerms) {
			return
		}

		console.log('terms!', demoTerms)

		this.setState({
			activeVocab: vocab.label,
			terms: demoTerms.terms,
		})

		// this.props.fetchVocabulary(vocab, (err, data) => {
		// 	this.setState({
		// 		terms: data.terms
		// 	})
		// })
	},

	maybeRenderTermsList: function () {
		if (!this.state.terms.length) return

		return (
			<div className="vocabulary-terms-list-container">
				<TermsList terms={this.state.terms} />
			</div>
		)
	},

	render: function () {
		const headings = [
			'pref_label',
			'label',
			'alt_label',
			'uri'
		]

		const data = [
			{ pref_label: 'firsties', label: '', alt_label: '', uri: 'https://example.com/ns' },
			{ pref_label: 'secondsies', label: '', alt_label: '', uri: ''},
		]

		return (
			<div className="vocabulary-management">
				<VocabularyList
					onClick={this.handleVocabClick}
					vocabularies={this.state.vocabularies}
				/>

				{this.maybeRenderTermsList()}
			</div>
		)
	}
})

export default Vocabularies
