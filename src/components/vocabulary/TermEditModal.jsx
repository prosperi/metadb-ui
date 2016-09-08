import React from 'react'
import Modal from 'react-modal'
import assign from 'object-assign'

import VocabularyMetadataFormFields from './VocabularyMetadataFormFields.jsx'

const T = React.PropTypes

const TermEditModal = React.createClass({
	propTypes: {
		data: T.object.isRequired,
		onSave: T.func.isRequired,
		onClose: T.func.isRequired,
	},

	getInitialState: function () {
		return {
			data: this.props.data,
			open: true,
		}
	},

	handleClose: function () {
		this.setState({open: false})

		this.props.onClose && this.props.onClose.call()
	},

	handleOnAddValueField: function (key) {
		const data = this.state.data
		data[key].push('')

		this.setState({data})
	},

	handleOnChange: function (key, index, value) {
		const data = this.state.data

		if (key === 'uri')
			data.uri = value
		else
			data[key][index] = value

		this.setState({data})
	},

	handleOnRemoveValueField: function (key, index) {
		const data = this.state.data
		data[key] = [].concat(
			data[key].slice(0, index),
			data[key].slice(index + 1)
		)

		this.setState({data})
	},

	handleSaveTerm: function () {
		this.props.onSave && this.props.onSave.call(null, this.state.data)
		this.handleClose()
	},

	render: function () {
		const modalStyles = {
			content: {
				borderColor: '#1d5f83',
				boxShadow: '0 1px 2px 1px #aaa',
				bottom: '25%',
				left: '10%',
				right: '10%',
				top: '10%',
			}
		}

		const headerStyles = {
			backgroundColor: '#1d5f83',
			color: '#fff',
			fontSize: '1.125em',
			margin: '-20px',
			marginBottom: '20px',
			padding: '.75em',
		}

		return (
			<Modal
				isOpen={this.state.open}
				onRequestClose={this.handleClose}
				style={modalStyles}
			>
				<header style={headerStyles}>
					Editing term: <strong>{this.state.data.pref_label[0]}</strong>
				</header>

				<VocabularyMetadataFormFields
					data={this.state.data}
					onAddValueField={this.handleOnAddValueField}
					onChange={this.handleOnChange}
					onRemoveValueField={this.handleOnRemoveValueField}
				/>

				<footer>
					<button onClick={this.handleSaveTerm}>Save term</button>
				</footer>
			</Modal>
		)
	}
})

export default TermEditModal
