import React, { PropTypes } from 'react'
import IndexLink from 'react-router/lib/IndexLink'
import Link from 'react-router/lib/Link'

const SiteHeader = React.createClass({
	render: function () {
		return (
		<header className="site-header navbar">
			<div className="site-title">
				<IndexLink to="/">MetaDB</IndexLink>
			</div>

			<div className="user-options">
				<ul className="site-navigation">
					<li>
						<Link to={`/search`}>
							Search
						</Link>
					</li>

					<li>
						<Link to={`/collections`}>
							Collections
						</Link>
					</li>

					<li>
						<Link to={`/vocabularies`}>
							Vocabularies
						</Link>
					</li>

					<li>
						<Link to="">
							Log out
						</Link>
					</li>
				</ul>
			</div>
		</header>
		)
	}
})

export default SiteHeader
