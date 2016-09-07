import React from 'react'
import Modal from 'react-modal'
import BulkTermsEditor from './BulkTermsEditor.jsx'

const T = React.PropTypes

const BulkTermsEditModal = React.createClass({
	propTypes: {
		onClose: T.func.isRequired,
		onSubmit: T.func.isRequired,

		terms: T.arrayOf(T.string).isRequired,

		label: T.string,
	},

	getInitialState: function () {
		return {
			modalOpen: true,
		}
	},

	closeModal: function (data) {
		this.setState({modalOpen: false})
		this.props.onClose(data)
	},

	handleClose: function (ev) {
		this.closeModal()
	},

	handleSubmit: function (data) {
		this.props.onSubmit.call(null, data)
		this.closeModal(data)
	},

	renderHeader: function (styles) {
		if (!this.props.label)
			return

		if (!styles)
			styles = {}

		return (
			<header style={styles}>
				Bulk-editing terms for {this.props.label}
			</header>
		)
	},

	render: function () {
		const styles = {
			modal: {
				content: {
					bottom: '12.5%',
					left: '12.5%',
					right: '12.5%',
					top: '12.5%',
				}
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
				isOpen={this.state.modalOpen}
				onRequestClose={this.handleClose}
				style={styles.modal}
			>
				{this.renderHeader(styles.header)}

				<BulkTermsEditor
					onSubmit={this.handleSubmit}
					resizable={false}
					terms={this.props.terms}
				/>
			</Modal>
		)
	}
})

export default BulkTermsEditModal
