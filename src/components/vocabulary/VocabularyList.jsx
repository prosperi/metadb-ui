import React from 'react'

const T = React.PropTypes

const VocabularyList = React.createClass({
	propTypes: {
		vocabularies: T.array.isRequired,
		onClick: T.func.isRequired,
	},

	getInitialState: function () {
		return {
			vocabularies: this.props.vocabularies
		}
	},

	handleKeyUp: function (ev) {
		const filtered = this.props.vocabularies.filter(v => {
			return v.name.indexOf(ev.target.value) > -1 ? true : false
		})

		this.setState({vocabularies: filtered})
	},

	handleVocabularyClick: function (vocabulary) {
		this.props.onClick.call(null, vocabulary)
	},

	maybeRenderCount: function (dobj) {
		if (typeof dobj.count == 'undefined') return

		return (
			<span className="term-count">
				Contains {dobj.count} term{dobj.count === 1 ? '' : 's'}
			</span>
		)
	},

	render: function () {
		return (
			<div className="vocabularies">
				<div className="list-filter" key={'filter'}>
					<input 
						type="text"
						className="filter"
						onKeyUp={this.handleKeyUp}
						/>
				</div>
				<ul className="vocab-list">
					{this.state.vocabularies.map((d, idx) => (
						<li key={idx} onClick={this.handleVocabularyClick.bind(null, d.name)}>
							{d.name}
							{this.maybeRenderCount(d)}
						</li>
					))}
				</ul>
			</div>
		)
	}
})

export default VocabularyList
