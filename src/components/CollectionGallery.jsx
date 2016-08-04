import React from 'react'

import Item from './CollectionGalleryItem.jsx'

const CollectionGallery = React.createClass({
	mapWorksToGrid: function () {
		return this.props.works.map((work, idx) => {
			const url = `/collections/${this.props.collectionId}/works/${work.id}`
			return (
				<Item
					key={'collectionitem'+idx}
					name={work.title}
					thumbnailUrl={work.thumbnailUrl}
					url={url}
				/>
			)
		})
	},

	render: function () {
		return (
			<section className="collection-gallery">
				{this.mapWorksToGrid()}
			</section>
		)
	}
})

export default CollectionGallery
