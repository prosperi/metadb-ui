import React from 'react'

import FormElementContainer from '../FormElementContainer.jsx'
import TextInput from '../form-elements/TextInput.jsx'
import TextArea from '../form-elements/TextArea.jsx'

const T = React.PropTypes

const VocabularyMetadataForm = React.createClass({
	propTypes: {
		onSubmit: T.func.isRequired,

		buttonLabel: T.string,
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
		const style = {
			textarea: {
				height: '10em',
			}
		}

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
						style={style.textarea}
						value={this.state.description}
					/>
				</FormElementContainer>

				<button>
					{this.props.buttonLabel || 'Submit'}
				</button>
			</form>
		)
	}
})

export default VocabularyMetadataForm
