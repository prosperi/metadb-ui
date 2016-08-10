import React from 'react'

import Link from 'react-router/lib/Link'

const CollectionGalleryItem = React.createClass({
	render: function () {
		return (
			<div className="gallery-item">
				<Link to={this.props.url}>
					<figure>
						<img src={this.props.thumbnailUrl}/>
						{this.props.name ? <figcaption>{this.props.name}</figcaption> : ''}
					</figure>
				</Link>
			</div>
		)
	}
})

export default CollectionGalleryItem
