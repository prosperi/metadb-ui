import React from 'react'
import assign from 'object-assign'

const T = React.PropTypes

const CollectionWrapper = React.createClass({
	componentDidMount: function () {

		const id = this.props.params.collectionId
		this.props.fetchCollection(id)
	},

	render: function () {
		const collection = this.props.collection.data
		const name = collection.name
		const description = collection.description
		
		return (
		<main className="collection-wrapper">
			<header className="collection-information">
				<h1 className="collection-header">
					<a href="#">{name}</a>
					{description ? <small>{description}</small> : ''}
				</h1>
			</header>

			{React.Children.map(this.props.children, c => {
				const props = assign({}, this.props, c.props)
				return React.cloneElement(c, props, c.props.children)
			})}
		</main>
		)
	}
})

export default CollectionWrapper
