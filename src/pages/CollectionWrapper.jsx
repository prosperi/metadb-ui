import React from 'react'

const T = React.PropTypes

const CollectionWrapper = React.createClass({
	componentDidMount: function () {
		// console.log('didMount props', this.props)
		const id = this.props.params.collectionId
		this.props.fetchCollection(id)
	},

	render: function () {
		const collection = this.props.selectedCollection
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
				return React.cloneElement(c, this.props, c.props.children)
			})}
		</main>
		)
	}
})

export default CollectionWrapper
