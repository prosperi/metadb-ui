import React from 'react'

import VocabularyList from '../components/vocabulary/VocabularyList.jsx'
import TermsList from '../components/vocabulary/TermsList.jsx'
import TableEditor from '../components/table-editor/TableEditor.jsx'

const Vocabularies = React.createClass({
	componentWillMount: function () {
		document.title = 'Vocab Management!'
	},

	componentWillUnmount: function () {
		document.title = ''
	},

	getDefaultProps: function () {
		return {
			vocabularies: [
			  { name: 'AI.coverage.location.image', count: 3 },
			  { name: 'AI.coverage.location.postmark', count: 5 },
			  { name: 'AI.coverage.location.producer', count: 16 },
			  { name: 'AI.coverage.location.recipient', count: 47 },
			  { name: 'AI.coverage.location.sender', count: 32 },
			  { name: 'AI.date.period', count: 3 },
			  { name: 'AI.subject.theme', count: 0 },
			  { name: 'BIOL.creator.NetID', count: 166 },
			  { name: 'BIOL.date.semester', count: 4 },
			  { name: 'BIOL.description.assignment', count: 4 },
			  { name: 'BIOL.subject', count: 816 },
			  { name: 'BJ.identifier.students', count: 0 },
			  { name: 'BJ.subject', count: 0 },
			  { name: 'BS.contributor', count: 1 },
			  { name: 'BS.creator', count: 13 },
			  { name: 'BS.subject', count: 13 },
			  { name: 'BS.subject.topical', count: 24 },
			  { name: 'CAP.creator.photographer', count: 75 },
			  { name: 'EAIC.contributor', count: 22 },
			  { name: 'EAIC.coverage.location', count: 276 },
			  { name: 'EAIC.coverage.location.country', count: 34 },
			  { name: 'EAIC.creator.company', count: 180 },
			  { name: 'EAIC.creator.maker', count: 118 },
			  { name: 'EAIC.description.ethnicity', count: 53 },
			  { name: 'EAIC.format.medium', count: 11 },
			  { name: 'EAIC.relation.ispartof', count: 26 },
			  { name: 'GS.country', count: 0 },
			  { name: 'GS.feature', count: 5 },
			  { name: 'GS.format.analog', count: 0 },
			  { name: 'GS.process', count: 0 },
			  { name: 'GS.state', count: 0 },
			  { name: 'GSESI.description.vantagepoint', count: 12 },
			  { name: 'GSESI.relation.ispartof', count: 2 },
			  { name: 'GSESI.rights.availability', count: 1 },
			  { name: 'GSESI.subject', count: 129 },
			  { name: 'MDL.creator', count: 274 },
			  { name: 'MDL.description.series', count: 26 },
			  { name: 'MDL.format.medium', count: 18 },
			  { name: 'MDL.publisher.original', count: 159 },
			  { name: 'MDL.subject.lcsh', count: 84 },
			  { name: 'MH.creator.maker', count: 5 },
			  { name: 'MH.subject', count: 16 },
			  { name: 'SRIDA.', count: 0 },
			  { name: 'SRIDA.AAT', count: 285 },
			  { name: 'SRIDA.LuteBodyShape', count: 1 },
			  { name: 'SRIDA.Publications', count: 186 },
			  { name: 'SRIDA.ReviewStatus', count: 4 },
			  { name: 'SRIDA.TGN', count: 45 },
			  { name: 'SRIDA.ULAN', count: 23 },
			  { name: 'SRIDA.ULAN.Repositories', count: 26 },
			  { name: 'SRIDA.Works', count: 0 },
			  { name: 'WD.honors', count: 22 },
			  { name: 'WD.military.rank', count: 20 },
			  { name: 'WD.military.unit', count: 38 },
			  { name: 'WD.place.birth', count: 69 },
			  { name: 'WD.place.death', count: 72 },
			  { name: 'WD.relation.ispartof', count: 1 },
			  { name: 'srida.Priority', count: 5 } 
		  ]
		}
	},

	getInitialState: function () {
		return {
			// vocabularies: this.props.vocabularies,
			vocabularies: [
				{ 
					uri: 'http://authority.lafayette.edu/ns/testVocab',
					label: ['testVocab'],
					alt_label: [],
					pref_label: [],
					hidden_label: [],
					relative_path: '/vocabularies/testVocab.json',
				},
			],

			terms: [],
		}
	},

	handleVocabClick: function (vocab) {
		this.props.fetchVocabulary(vocab, (err, data) => {
			this.setState({
				terms: data.terms
			})
		})
	},

	maybeRenderTermsList: function () {
		if (!this.state.terms.length) return

		return (
			<TermsList terms={this.state.terms} />
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
