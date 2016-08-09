import React from 'react'
import Link from 'react-router/lib/Link'

const Home = React.createClass({
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

			<h2>Recent uploads</h2>
			<ul>
				<lh>Works</lh>
				<li><Link to="/works/g732d898n">title5</Link></li>
				<li><Link to="/works/2227mp65f">title4</Link></li>
			</ul>
		</div>
		)
	}
})

export default Home
