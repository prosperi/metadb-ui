import React from 'react'
import Link from 'react-router/lib/Link'

const T = React.PropTypes

const ResultsGalleryItem = React.createClass({
	propTypes: {
		item: T.object,
		position: T.number,
		width: T.string,
	},

	getInitialState: function () {
		return {
			isHovered: false,
		}
	},

	render: function () {
		const src = process.env.API_BASE_URL + this.props.item.thumbnail_path
		const containerProps = {
			onMouseOver: e => this.setState({isHovered: true}),
			onMouseOut: e => this.setState({isHovered: false}),

			style: {
				backgroundColor: (this.state.isHovered ? '#dee' : 'transparent'),
				display: 'inline-block',
				height: '100%',
				padding: '10px',
				width: this.props.width || '175px',
			},
		}

		const imgStyle = {
			opacity: (this.state.isHovered ? '.5' : '1'),
			width: '100%',
		}

		return (
			<Link to={`/works/${this.props.item.id}`} style={{display: 'inline-block'}}>
				<figure {...containerProps}>
					<img src={src} style={imgStyle} />
					<figcaption>
						{this.props.item.title[0]}
					</figcaption>
				</figure>
			</Link>
		)
	}
})

export default ResultsGalleryItem
