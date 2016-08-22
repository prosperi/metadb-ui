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
			<figure className="thumbnail-preview" onClick={this.handleOnClick}>
				<img src={this.props.src} />

				{this.maybeRenderCaption()}
			</figure>
		)
	}
})

export default ThumbnailPreview
