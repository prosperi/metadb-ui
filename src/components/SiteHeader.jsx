import React, { PropTypes } from 'react'
import IndexLink from 'react-router/lib/IndexLink'

const SiteHeader = React.createClass({
	render: function () {
		return (
		<header className="site-header">
			<IndexLink to="/">MetaDB</IndexLink>
		</header>
		)
	}
})

export default SiteHeader
