import React from 'react'
import ModalWithHeader from '../ModalWithHeader.jsx'
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
		const modalProps = {
			header: `Edit metadata for ${this.props.name}`,
			isOpen: this.state.open,
			onRequestClose: this.closeModal,
			style: {
				content: {
					boxShadow: '0 1px 2px 1px #aaa',
					bottom: '33%',
				}
			}
		}

		const vocabProps = {
			buttonLabel: 'Submit changes',
			description: this.props.description,
			name: this.props.name,
			onSubmit: this.handleSubmit,
		}

		const deleteButtonProps = {
			children: `Delete ${this.props.name}`,
			onClick: this.props.onDelete,
			style: {
				backgroundColor: '#cc092f',
				border: '2px solid #aa070d',
				borderRadius: '2px',
				color: '#fff',
				cursor: 'pointer',
				marginTop: '2em',
			}
		}

		return (
			<ModalWithHeader {...modalProps}>
				<VocabularyMetadataForm {...vocabProps} />
				<button {...deleteButtonProps} />
			</ModalWithHeader>
		)
	}
})

export default EditVocabularyModal
