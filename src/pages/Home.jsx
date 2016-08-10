import React from 'react'
import { get } from '../../lib/api/request'
import Link from 'react-router/lib/Link'

import Gallery from '../components/Gallery.jsx'

const Home = React.createClass({
	getInitialState: function () {
		return {
			galleryData: null,
		}
	},

	componentDidMount: function () {
		get('/catalog.json', (err, res) => {
			const items = res.resources
			console.log(items)

			this.setState({
				items: items.map(i => ({
					id: i.id,
					thumbnail_path: i.thumbnail_path,
					title: i.title,
				}))
			})
		})
	},

	renderRecentAdditions: function () {
		if (!this.state.items) return

		return (
			<Gallery
				buildThumbnailUrl={i => `https://sporades0.stage.lafayette.edu/${i}`}
				buildUrl={i => `/works/${i.id}`}
				items={this.state.items}
			/>
		)
	},

	render: function () {
		return (
		<div>
			<h1>Welcome to MetaDB</h1>
			
			<p>MetaDB is a distributed metadata collection tool developed by
			Lafayette College Libraries. It allows institutions to use a
			web-based interface to split digital collection building tasks
			among several people.</p>
			
			<p>For example, at Lafayette, a librarian creates new projects,
			defines metadata requirements, supplies data for administrative
			fields, and imports high-resolution master TIF images into the
			system. Subject specialists then access the system remotely and
			enter descriptive data about each item. Once all metadata has been
			collected, projects are exported as CSV or tab-delimited data files
			that are easily ingested into most repository systems. </p>

			<p>MetaDB supports several features that strengthen digital collection
			building efforts, including the use of controlled vocabularies,
			the ability to search, browse, sort, and edit records in different
			ways, and support for concurrent access by multiple users. The
			application extracts technical metadata from images, and automatically
			creates JPG access derivatives that can include branded or banded text,
			as well as zoomable high-resolution images for close study. </p>

			<p>MetaDB version 3 was developed by Eric Luhrs, Digital Initiatives
			Librarian at Lafayette College, and Computer Science students Long Ho
			and Haruki Yamaguchi. Documentation and source code are available
			on the MetaDB project page hosted by Google Code. </p>

			{this.renderRecentAdditions()}

		</div>
		)
	}
})

export default Home
