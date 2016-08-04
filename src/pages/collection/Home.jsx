import React from 'react'

import Link from 'react-router/lib/Link'

const Home = React.createClass({

	render: function () {
		console.log(this.props)
		return (
			<div>
				<ul>
				{this.props.collection.works.map((w, i) => {
					const key = w.id + i
					const collectionId = this.props.params.collectionId

					const url = `/collections/${collectionId}/works/${w.id}`
					return (
						<li key={w.id+i}>
							<Link to={url}>{w.id}</Link>
						</li>
					)
				})}
				</ul>
			</div>

		)
	}
})

export default Home
