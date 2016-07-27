'use strict'

import React from 'react'
import assign from 'object-assign'

import IndexLink from 'react-router/lib/IndexLink'
import Link from 'react-router/lib/Link'
import browserHistory from 'react-router/lib/browserHistory'

const T = React.PropTypes

const CollectionWrapper = React.createClass({

	componentWillMount: function () {
		const id = this.props.params.collectionId
		this.props.fetchCollection(id)

		this.rootPath = `/collections/${id}`
	},

	handleWorkEditClick: function (ev) {
		// if `params.workId` is defined, we're on the WorkEdit screen
		// + already have a work in place, so we should ignore the click		
		if (this.props.params.workId) {
			ev.preventDefault()
			return
		}

		// otherwise, we'll find the first work in the collection
		// and display that
		// (TODO: w/ controls to move fwd/bkwd through the collection works)
		const works = this.props.collection.works

		if (works && works.length) {
			ev.preventDefault()
			const first = works[0]
			const id = first.id
			const url = `${this.rootPath}/works/${id}`

			browserHistory.push(`${this.rootPath}/works/${id}`)
			return
		}
	},

	render: function () {
		const collection = this.props.collection.data
		const name = collection.name
		const description = collection.description
		
		const hasWork = !!this.props.params.workId
		const baseUrl = this.rootPath

		return (
		<main className="collection-wrapper">
			<header className="collection-information">
				<h1 className="collection-header">
					<Link to={this.rootPath}>{name}</Link>
					{description ? <small>{description}</small> : ''}
				</h1>
			</header>

			<nav className="collection-navigation">
				<ul className="nav-tabs">
					<li className="tab">
						<IndexLink
							activeClassName="active"
							to={baseUrl}
							>
							Collection Home
						</IndexLink>
					</li>

					<li className="tab">
						<Link
							onClick={this.handleWorkEditClick}
							className={hasWork ? 'active' : ''}
							to={hasWork ? '' : `${baseUrl}/works`}
						>
							Work Edit
						</Link>
					</li>

					<li className="tab">
						<Link
							activeClassName="active"
							to={`${baseUrl}/import`}
						>
							Import Metadata
						</Link>
					</li>

					<li className="tab">
						<Link
							activeClassName="active"
							to={`${baseUrl}/export`}
						>
							Export Metadata
						</Link>
					</li>

					<li className="tab">
						<Link
							activeClassName="active"
							to={`${baseUrl}/edit`}
							>
							Edit Collection
						</Link>
					</li>
				</ul>
			</nav>

			{React.Children.map(this.props.children, c => {
				const props = assign({}, this.props, c.props)
				return React.cloneElement(c, props, c.props.children)
			})}

		</main>
		)
	}
})

export default CollectionWrapper
