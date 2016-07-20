import React, { PropTypes } from 'react'
import IndexLink from 'react-router/lib/IndexLink'

const SiteHeader = React.createClass({
	render: function () {
		return (
		<header className="site-header navbar">
			<div className="site-title">
				<IndexLink to="/">MetaDB</IndexLink>
			</div>
		</header>
		)
	}
})

export default SiteHeader
