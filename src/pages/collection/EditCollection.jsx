import React from 'react'
import CollectionMetadataForm from '../../components/CollectionMetadataForm.jsx'
import assign from 'object-assign'

const EditCollection = React.createClass({
	handleChange: function (key, value) {
		this.props.editCollectionField(key, value)
	},

	handleSubmit: function () {
		this.props.saveCollection()
	},

	render: function () {
		const original = this.props.collection.data
		const updates = this.props.collection.updates
		const data = assign({}, original, updates)

		return (
			<CollectionMetadataForm
				metadata={data}
				onChange={this.handleChange}
				onSubmit={this.handleSubmit}
			/>
		)
	}
})

export default EditCollection
