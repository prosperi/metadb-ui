import React from 'react'
import Link from 'react-router/lib/Link'

const Home = React.createClass({
	handleClick: function () {
		return console.log(this.props)
	},

	render: function () {
		return (
		<div>
			<div>welcome home</div>
			<Link to="/works/2227mp65f">Visit something</Link>
			<button onClick={this.handleClick}>click slowly and see</button>
		</div>
		)
	}
})

export default Home
