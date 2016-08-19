import React from 'react'
import assign from 'object-assign'

import Navbar from '../components/Navbar.jsx'

const Main = React.createClass({
	render: function () {
		return (
		<div>
			<Navbar />
			{React.Children.map(this.props.children, c => {
				const props = assign({}, this.props, c.props)
				return React.cloneElement(c, props, c.props.children)
			})}
		</div>
		)
	}
})

export default Main
