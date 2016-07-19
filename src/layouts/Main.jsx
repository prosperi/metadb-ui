import React from 'react'

import SiteHeader from '../components/SiteHeader.jsx'

const Main = React.createClass({
	render: function () {
		return (
		<div>
			<SiteHeader />
			{React.cloneElement(this.props.children, this.props)}
		</div>
		)
	}
})

export default Main
