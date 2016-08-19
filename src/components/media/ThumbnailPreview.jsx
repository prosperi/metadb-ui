import React from 'react'
import isAbsoluteUrl from 'is-absolute-url'

const T = React.PropTypes

const ThumbnailPreview = React.createClass({
	propTypes: {
		src: T.string.isRequired,

		caption: T.string,
		onClick: T.func,
	},


	fullSrc: function () {
		if (isAbsoluteUrl(this.props.src))
			return this.props.src

		return `${process.env.API_BASE_URL || ''}${this.props.src}`

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
				<img src={this.fullSrc()} />

				{this.maybeRenderCaption()}
			</figure>
		)
	}
})

export default ThumbnailPreview
