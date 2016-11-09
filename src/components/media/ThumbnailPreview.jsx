import React from 'react'

const T = React.PropTypes

const ThumbnailPreview = React.createClass({
	propTypes: {
		src: T.string.isRequired,

		caption: T.string,
		onClick: T.func,
	},

	handleOnClick: function () {
		if (!this.props.onClick)
			return

		return this.props.onClick()
	},

	maybeRenderCaption: function () {
		if (!this.props.caption)
			return

		return <figcaption>{this.props.caption}</figcaption>
	},

	render: function () {
		return(
			<div className="thumbnail-preview-panel">
				<figure className="thumbnail-preview" >
					<img src={this.props.src} />

					{this.maybeRenderCaption()}
					<button onClick={this.handleOnClick}>Open Viewer</button>
				</figure>
				<a href="#">View/Create Derivatives</a>
				<h6>Last updated: YYYY - MM - DD</h6>
			</div>
		)
	}
})

export default ThumbnailPreview
