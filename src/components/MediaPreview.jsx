import React from 'react'

const T = React.PropTypes

function AvailableSize (props, idx) {
	return (
		<li key={props.name+(idx || 0)}>
			<a href={props.url}>{props.name}</a>
			<span>{props.dimensions}</span>
		</li>
	)
}

const MediaPreview = React.createClass({
	propTypes: {
		title: T.string,

		thumbnailUrl: T.string,

		availableSizes: T.arrayOf(T.shape({
			name: T.string,
			dimensions: T.string,
			url: T.string,
		})),

		availableSizesText: T.string,
	},

	getDefaultProps: function () {
		return {
			availableSizesText: 'Available sizes:'
		}
	},

	renderAvailableSizes: function () {
		if (!this.props.availableSizes.length) return

		return (
			<footer>
				<p>{this.props.availableSizesText}</p>
				<ul className="available-sizes">
					{this.props.availableSizes.map(AvailableSize)}
				</ul>
			</footer>
		)
	},

	renderHeader: function () {
		if (!this.props.title) return

		return (
			<header>
				<h2>{this.props.title}</h2>
			</header>
		)
	},

	renderThumbnail: function () {
		if (!this.props.thumbnailUrl) return

		return (
			<figure>
				<img src={this.props.thumbnailUrl} />
			</figure>
		)
	},

	render: function () {
		return (
			<section className="media-preview">
				{this.renderHeader()}
				{this.renderThumbnail()}
				{this.renderAvailableSizes()}
			</section>
		)
	}
})

export default MediaPreview
