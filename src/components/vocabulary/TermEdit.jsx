'use strict'

import React from 'react'
import assign from 'object-assign'
import Modal from 'react-modal'
import TermEditItem from './TermEditItem.jsx'

const T = React.PropTypes

const TermEdit = React.createClass({
	propTypes: {
		displayKey: T.string,

		terms: T.arrayOf(T.object),
	},

	getInitialState: function () {
		return {
			displayKey: this.props.displayKey,
			modalOpen: false,
			selectedIndex: 0,
			terms: this.props.terms,
		}
	},

	handleAddValueField: function (termIndex, key) {

	},

	handleChange: function (termIndex, key, index, value) {

	},

	handleRemoveValueField: function (termIndex, key, index) {

	},

	handleCloseModal: function () {
		if (this.state.modalOpen) {
			this.setState({
				modalOpen: false,
			})
		}
	},

	handleToggle: function (index) {
		const current = this.state.selectedIndex

		this.setState({
			selectedIndex: index === current ? -1 : index,
		})
	},

	importModal: function () {
		if (!this.state.modalOpen) return

		return (
			<Modal
				isOpen={this.state.modalOpen}
				onRequestClose={this.handleCloseModal}
				>
				<h1>I am a modal!</h1>
				<button onClick={this.handleCloseModal}>close</button>
			</Modal>
		)
	},

	toggleImportModal: function () {
		this.setState({
			modalOpen: !this.state.modalOpen
		})
	},

	renderTerms: function () {
		const val = this.props.terms.reduce((prev, curr) => `${prev}${curr.pref_label}\n`, '')

		return <textarea defaultValue={val} />

		// const terms = this.props.terms
		
		// return terms.map((term, index) => {
		// 	let props = {
		// 		displayKey: this.state.displayKey,
		// 		key: index,
		// 		onToggle: this.handleToggle.bind(null, index),
		// 		term,
		// 	}

		// 	if (index === this.state.selectedIndex) {
		// 		props = assign(props, {
		// 			open: true,
		// 			onAddValueField: this.handleAddValueField.bind(null, index),
		// 			onChange: this.handleChange.bind(null, index),
		// 			onRemoveValueField: this.handleRemoveValueField.bind(null, index),
		// 		})
		// 	}

		// 	return (
		// 		<TermEditItem {...props} />
		// 	)
		// })
	},

	render: function () {
		return (
			<div className="term-edit-container">
				<header>
					<input type="text" disabled/>
					<button onClick={this.toggleImportModal}>Import terms</button>
				</header>

				<div className="terms">
					{this.renderTerms()}
				</div>

				<footer>

				</footer>

				{this.importModal()}
			</div>
		)
	}
})

export default TermEdit 
