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
		// const mocked = Object.keys(mockVocabularies).map(k => ({
		// 	uri: `http://authority.lafayette.edu/ns/${k}`,
		// 	label: [k],
		// 	alt_label: [],
		// 	pref_labe: [],
		// 	hidden_label: [],
		// 	relative_path: '',
		// 	terms: mockVocabularies[k].map(t => ({
		// 		uri: `http://authority.lafayette.edu/ns/${k}/${t}`,
		// 		label: [t],
		// 		alt_label: [],
		// 		pref_label: [],
		// 		hidden_label: [],
		// 		relative_path: '',
		// 	})),
		// }))

		// return {
		// 	vocabularies: mocked,
		// 	terms: [],
		// }

		return {
			// vocabularies: this.props.vocabularies,
			vocabularies: [
				{ 
					uri: 'http://authority.lafayette.edu/ns/testVocab',
					label: ['testVocab'],
					alt_label: [],
					pref_label: [],
					hidden_label: [],
					relative_path: '/vocabularies/testVocab.json'
				},
			],

 			terms: [],
		}
	},

	handleVocabClick: function (vocab) {
		// const vocabs = this.state.vocabularies

		// const demoTerms = vocabs.find(v => {
		// 	return v.label.length && v.label[0] === vocab.label[0]
		// })
		// if (!demoTerms) {
		// 	return
		// }

		// console.log('terms!', demoTerms)

		// this.setState({
		// 	activeVocab: vocab.label,
		// 	terms: demoTerms.terms,
		// })

		this.props.fetchVocabulary(vocab, (err, data) => {
			this.setState({
				terms: data.terms
			})
		})
	},

	maybeRenderTermsList: function () {
		if (!this.state.terms.length) return

		return (
			<div className="vocabulary-terms-list-container">
				<h2>this.state.activeVocab</h2>
				<TableEditor 
					classNames={{table: 'vocabulary-terms-list'}}
					data={this.state.terms}
					headings={['uri', 'label', 'alt_label', 'pref_label', 'hidden_label']}
					useTextArea={false}

					onCellCancel={console.log}
					onCellClick={console.log}
					onCellSubmit={console.log}
				/>

				<button disabled>Submit changes</button>
			</div>
		)

		// return (
		// 	<div className="vocabulary-terms-list-container">
		// 		<TermsList terms={this.state.terms} />
		// 	</div>
		// )
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
			<div className="vocabulary-management-container">
				<header style={{borderBottom: '1px solid #aaa'}}>
					<h1>Vocabulary Management</h1>
					<p style={{ fontSize: '1.25em' }}>Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.</p>
				</header>

				<div className="vocabulary-management">
					<div className="vocabularies-container">
						<VocabularyList
							onClick={this.handleVocabClick}
							vocabularies={this.state.vocabularies}
						/>
					</div>
					
					{this.maybeRenderTermsList()}
				</div>
			</div>
		)
	}
})

export default Vocabularies
