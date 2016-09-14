import React from 'react'
import Modal from 'react-modal'
import VocabularyMetadataForm from './VocabularyMetadataForm.jsx'

const T = React.PropTypes

const EditVocabularyModal = React.createClass({
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
					bottom: '10%',
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
			},

			deleteButton: {
				backgroundColor: '#cc092f',
				border: '2px solid #aa070d',
				borderRadius: '2px',
				color: '#fff',
				cursor: 'pointer',
				marginTop: '2em',
			}
		}

		return (
			<Modal
				isOpen={this.state.open}
				onRequestClose={this.closeModal}
				style={style.modal}
			>
				<header style={style.header}>
					Edit metadata for {this.props.name}
				</header>

				<VocabularyMetadataForm
					buttonLabel="Submit changes"
					description={this.props.description}
					name={this.props.name}
					onSubmit={this.handleSubmit} 
				/>

				<button
					children={'Delete ' + this.props.name}
					onClick={this.props.onDelete}
					style={style.deleteButton}
				/>
			</Modal>
		)
	}
})

export default EditVocabularyModal
