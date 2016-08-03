// renders an work-by-work navigation block
import React from 'react'
import Link from 'react-router/lib/Link'

const T = React.PropTypes

const CollectionWorkNavigation = React.createClass({
	propTypes: {
		collection: T.object.isRequired,
		
		activeIndex: T.number,
	},

	getDefaultProps: function () {
		return {
			activeIndex: 0
		}
	},

	handleInputChange: function (ev) {

	},

	handleInputKeyDown: function (ev) {

	},

	link: function (id, text) {
		const collId = this.props.collection.data.name
		const worksRoute = `/collections/${collId}/works`
		const url = id ? `${worksRoute}/${id}` : ''
		return (
			<Link to={url}>{text}</Link>
		)
	},

	firstWorkLink: function () {
		const works = this.props.collection.works
		const id = works[0].id
		return this.link(id, '«')
	},

	lastWorkLink: function () {
		const works = this.props.collection.works
		const id = works[works.length - 1].id
		return this.link(id, '»')
	},

	nextWorkLink: function () {
		const works = this.props.collection.works
		const current = this.props.activeIndex
		const nextIdx = current + 1

		return this.link(
			(nextIdx >= works.length ? null : works[nextIdx].id), 
			'>'
		)
	},

	position: function () {
		const works = this.props.collection.works
		const length = works.length
		const currentPage = this.props.activeIndex + 1

		const input = (
			<input
				type="number"
				min={1}
				max={works.length}
				defaultValue={currentPage}
				onBlur={this.handleInputBlur}
				onKeyDown={this.handleInputKeyDown}
			/>
		)

		return (
			<span>Editing item {input} of {length}</span>
		)
	},

	previousWorkLink: function () {
		const current = this.props.activeIndex
		const prevIdx = current - 1

		return this.link(
			(prevIdx < 0 ? null : this.props.collection.works[prevIdx].id),
			'<'
		)
	},

	render: function () {
		return (
			<nav className="collection-work-navigation">
				{this.firstWorkLink()}
				{this.previousWorkLink()}

				{this.position()}
				
				{this.nextWorkLink()}
				{this.lastWorkLink()}
			</nav>
		)
	}
})

export default CollectionWorkNavigation
