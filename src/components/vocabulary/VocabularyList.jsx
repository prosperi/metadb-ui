import React from 'react'

const T = React.PropTypes
const ACTIVE_VOCABULARY_KEY = 'label'

const VocabularyList = React.createClass({
	propTypes: {
		vocabularies: T.array.isRequired,
		onClick: T.func.isRequired,
	},

	getInitialState: function () {
		return {
			activeIndex: -1,
			activeVocab: null,
			filterQuery: '',
			hoverIndex: -1,
			vocabularies: this.props.vocabularies,
		}
	},

	clearHoverIndex: function () {
		this.setState({hoverIndex: -1})
	},

	handleInputFocus: function () {
		this.setState({
			hoverIndex: -1,
		})
	},

	handleChange: function (ev) {
		const val = ev.target.value
		const filtered = this.props.vocabularies.filter(vocab => {
			return vocab[ACTIVE_VOCABULARY_KEY][0].toLowerCase().indexOf(val.toLowerCase()) > -1 ? 1 : 0
		})

		this.setState({
			filterQuery: val,
			vocabularies: filtered,
		})
	},

	handleAddVocabulary: function (ev) {
		console.log('add a vocab!')
	},

	handleVocabularyClick: function (vocabulary, index) {
		if (index === this.state.activeIndex)
			return

		this.setState({
			activeIndex: index,
			activeVocab: vocabulary.label,
		})

		this.props.onClick.call(null, vocabulary)
	},

	maybeRenderCount: function (data) {
		if (!data || !data.terms) return

		const len = data.terms.length

		// if (typeof data.count == 'undefined') return

		return (
			<span className="term-count">
				Contains {len} term{len === 1 ? '' : 's'}
			</span>
		)
	},

	renderLi: function (data, index) {
		const classname = []

		if (this.state.hoverIndex === index) {
			classname.push('hover')
		}

		if (this.state.activeVocab === data[ACTIVE_VOCABULARY_KEY])
			classname.push('active')

		return (
			<li
				className={classname.join(' ')}
				key={index}
				onClick={this.handleVocabularyClick.bind(null, data, index)}
				onMouseOver={this.setHoverIndex.bind(null, index)}
			>
				{data.label}
				{this.maybeRenderCount(data)}
			</li>
		)
	},

	renderVocabList: function () {
		const query = this.state.filterQuery

		if (!this.state.vocabularies || !this.state.vocabularies.length) {
			return (
				<div className="vocab-list--empty">
					No vocabularies
					{query ? ` found with "${query}"` : '' }
				</div>
			)
		}


		return (
			<ul className="vocab-list" onMouseOut={this.clearHoverIndex}>
				{this.state.vocabularies.map(this.renderLi)}
			</ul>
		)
	},

	setHoverIndex: function (index) {
		this.setState({hoverIndex: index})
	},

	render: function () {
		return (
			<div className="vocabularies">
				<div className="list-filter" key={'filter'}>
					<input 
						type="search"
						className="filter"
						onChange={this.handleChange}
						onFocus={this.handleInputFocus}
						/>
				</div>

				{this.renderVocabList()}
				
				<div className="list-footer" key={'footer'}>
					<button onClick={this.handleAddVocabulary}>+ Add Vocabulary</button>
				</div>
			</div>
		)
	}
})

export default VocabularyList
