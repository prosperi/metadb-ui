'use strict'

import React from 'react'

import Item from './GalleryItem.jsx'

const Gallery = React.createClass({
	getDefaultProps: function () {
		return {
			buildThumbnailUrl: url => (url),
			buildUrl: item => (item.id || '')
		}
	},

	mapItemsToGrid: function () {
		return this.props.items.map((item, idx) => {
			const url = this.props.buildUrl(item)
			let thumbnail = item.thumbnail_path

			if (Array.isArray(thumbnail))
				thumbnail = thumbnail[0]

			return (
				<Item
					key={'collectionitem'+idx}
					name={item.title}
					thumbnailUrl={this.props.buildThumbnailUrl(thumbnail)}
					url={url}
				/>
			)
		}).filter(i => i)
	},

	render: function () {
		return (
			<section className="gallery">
				{this.mapItemsToGrid()}
			</section>
		)
	}
})

export default Gallery
