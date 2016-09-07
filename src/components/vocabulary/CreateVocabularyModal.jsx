import React from 'react'
import Modal from 'react-modal'
import CreateVocabularyForm from './CreateVocabularyForm.jsx'

const T = React.PropTypes

const CreateVocabularyModal = React.createClass({
	propTypes: {
		onClose: T.func.isRequired,
		onSubmit: T.func.isRequired,
	},

	getInitialState: function () {
		return {
			open: true,
		}
	},

	closeModal: function () {
		this.setState({
			open: false,
		})
		this.props.onClose.call()
	},

	handleSubmit: function (data) {
		this.props.onSubmit.call(null, data)
		this.closeModal()
	},

	render: function () {
		const style = {
			modal: {
				content: {
					borderColor: '#1d5f83',
					boxShadow: '0 1px 2px 1px #aaa',
					bottom: '25%',
					left: '10%',
					right: '10%',
					top: '10%',
				},
			},

			header: {
				backgroundColor: '#1d5f83',
				color: '#fff',
				fontSize: '1.125em',
				margin: '-20px',
				marginBottom: '20px',
				padding: '.75em',
			}
		}

		return (
			<Modal
				isOpen={this.state.open}
				onRequestClose={this.closeModal}
				style={style.modal}
			>
				<header style={style.header}>
					Create a new vocabulary
				</header>

				<CreateVocabularyForm onSubmit={this.handleSubmit} />
			</Modal>
		)
	}
})

export default CreateVocabularyModal
