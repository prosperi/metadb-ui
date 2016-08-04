import React from 'react'
import CollectionGallery from '../../components/CollectionGallery.jsx'

const Home = React.createClass({

	render: function () {

		return (
			<div>
				<h3>{`Click on a thumbnail to edit an item's metadata`}</h3>
				<CollectionGallery
					collectionId={this.props.collection.data.id}
					works={this.props.collection.works}
				/>
			</div>

		)
	}
})

export default Home
