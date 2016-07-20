import React from 'react'

import SiteHeader from '../components/SiteHeader.jsx'

const Main = React.createClass({
	render: function () {
		return (
		<div>
			<SiteHeader />
			{React.Children.map(this.props.children, c => {
				return React.cloneElement(c, this.props, c.props.children)
			})}
		</div>
		)
	}
})

export default Main
