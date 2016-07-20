import React from 'react'
import Link from 'react-router/lib/Link'

const Home = React.createClass({
	render: function () {
		return (
		<div>
			<h2>Recent uploads</h2>
			<ul>
				<lh>Works</lh>
				<li><Link to="/works/g732d898n">title5</Link></li>
				<li><Link to="/works/2227mp65f">title4</Link></li>

				<lh>Collections</lh>
				<li><Link to="/collections/0g354f26g">test collection</Link></li>
			</ul>
		</div>
		)
	}
})

export default Home
