import React from 'react'

import FormElementContainer from '../FormElementContainer.jsx'
import TextInput from '../form-elements/TextInput.jsx'
import TextArea from '../form-elements/TextArea.jsx'

const T = React.PropTypes

const CreateVocabularyForm = React.createClass({
	propTypes: {
		onSubmit: T.func.isRequired,

		name: T.string,
		description: T.string,
	},

	getInitialState: function () {
		return {
			name: this.props.name || '',
			description: this.props.description || '',
		}
	},

	handleSubmit: function (ev) {
		ev.preventDefault()

		this.props.onSubmit.call(null, this.state)
	},

	updateDescription: function (_, val) {
		this.setState({description: val})
	},

	updateName: function (_, val) {
		this.setState({name: val})
	},

	render: function () {
		return (
			<form onSubmit={this.handleSubmit}>
				<FormElementContainer
					label="Vocabulary Name"
					multipleValues={false}
					onChange={this.updateName}
				>
					<TextInput
						placeholder=""
						value={this.state.name}
					/>
				</FormElementContainer>

				<FormElementContainer
					label="Description"
					multipleValues={false}
					onChange={this.updateDescription}
				>
					<TextArea
						placeholder=""
						value={this.state.description}
					/>
				</FormElementContainer>

				<button>Create new vocabulary</button>
			</form>
		)
	}
})

export default CreateVocabularyForm
