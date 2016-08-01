import React from 'react'
import FormMetadataWrapper from './form-elements/FormElementWrapper.jsx'
import TextInputField from './form-elements/TextInputField.jsx'

const T = React.PropTypes

const CollectionMetadataForm = React.createClass({
	propTypes: {
		metadata: T.shape({
			name: T.string,
			description: T.string,
		}),
		onChange: T.func,
		onSubmit: T.func,
	},

	handleChange: function (key, index, val) {
		this.props.onChange(key, val)
	},

	handleSubmit: function () {
		this.props.onSubmit()
	},

	render: function () {
		return (
			<div>
				<FormMetadataWrapper
					name="collection-title"
					formLabel="Collection Name"
					onChange={this.handleChange.bind(null, 'name')}
				>
					<TextInputField 
						placeholder="Enter a name for the collection"
						value={this.props.metadata.name}
					/>
				</FormMetadataWrapper>

				<FormMetadataWrapper
					name="collection-description"
					formLabel="Collection Description"
					onChange={this.handleChange.bind(null, 'description')}
				>
					<TextInputField
						largerField={true}
						placeholder="Describe the collection"
						value={this.props.metadata.description}
					/>
				</FormMetadataWrapper>

				<button onClick={this.handleSubmit}>Submit Changes</button>
			</div>
		)
	}
})

export default CollectionMetadataForm
