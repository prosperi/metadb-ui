import React from 'react'
import RecentItemsList from '../components/recent-items/RecentItemsList.jsx'
import { search } from '../store/search/endpoints'

const Home = React.createClass({
	getInitialState: function () {
		return {
			items: [],
			loadingNewItems: false,
		}
	},

	componentWillMount: function () {
		this.setState({loadingNewItems: true})

		search('per_page=5')
			.then(res => res.response.docs)
			.then(items => {
				this.setState({
					loadingNewItems: false,
					items,
				})
			})
	},

	recentItems: function () {
		if (this.state.loadingNewItems) {
			return <div><h1>loading new items...</h1></div>
		}

		return (
			<RecentItemsList
				buildUrl={item => `/works/${item.id}`}
				items={this.state.items}
				title="Recently added items"
			/>
		)
	},

	render: function () {
		return (
		<div>
			<section className="recents">
				{this.recentItems()}
			</section>
		</div>
		)
	}
})

export default Home
