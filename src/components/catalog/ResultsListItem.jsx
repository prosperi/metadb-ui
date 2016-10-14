import React from 'react'
import Link from 'react-router/lib/Link'

const T = React.PropTypes

const ResultsListItem = React.createClass({
	propTypes: {

	},

	clearfix: function () {
		const style = {
			clear: 'both',
			content: '',
			display: 'table',
		}

		return <div style={style} key="clearfix" />
	},

	getItemColor: function () {
		return this.isCollection() ? '#910029' : '#1d5f83'
	},

	getStyles: function () {
		const borderColor = this.getItemColor()
		return {
			container: {
				backgroundColor: '#fff',
				borderColor: borderColor,
				borderStyle: 'solid',
				borderRadius: '2px',
				borderWidth: '1px',
				height: '200px',
				margin: '10px 0',
				padding: '25px 10px 10px',
				position: 'relative',
			},
			header: {
				display: 'inline-block',
				fontSize: '18px',
				fontWeight: 'bold',
			},
			subtitle: {
				display: 'block',
				fontSize: '14px',
				fontStyle: 'italic',
				fontWeight: 'normal',
				marginBottom: '10px',
			},
			thumbnail: {
				maxHeight: '150px',
				maxWidth: '150px',
				float: 'right',
				// verticalAlign: 'top',
			},
			author: {
				color: '#666',
				marginTop: '5px',
			},
			format: {

			},
			number: {
				backgroundColor: borderColor,
				borderTopLeftRadius: '1px',
				borderBottomRightRadius: '2px',
				color: '#fff',
				display: 'inline-block',
				fontSize: '12px',
				left: '0',
				padding: '2px 4px',
				position: 'absolute',
				textAlign: 'center',
				top: '0',
			},
			type: {
				backgroundColor: borderColor,
				borderBottomLeftRadius: '2px',
				borderTopRightRadius: '1px',
				color: '#fff',
				display: 'inline-block',
				fontSize: '12px',
				right: '0',
				padding: '2px 4px',
				position: 'absolute',
				textAlign: 'center',
				top: '0',
			}
		}
	},

	isCollection: function () {
		return this.props.type === 'Collection'
	},

	isWork: function () {
		return this.props.type === 'Work'
	},

	maybeRenderType: function () {
		if (this.isWork())
			return

		const style = this.getStyles().type

		return <span style={style} children={this.props.type}/>
	},

	renderItemPosition: function () {
		const style = this.getStyles().number

		return <span style={style} children={this.props.itemNumber} />
	},

	renderThumbnail: function () {
		if (!this.props.thumbnail_path)
			return

		const style = this.getStyles().thumbnail
		const srcUrl = process.env.API_BASE_URL + this.props.thumbnail_path

		return <img style={style} src={srcUrl} />
	},

	render: function () {
		const styles = this.getStyles()

		const mainTitle = this.props.title.shift()
		const subtitles = this.props.title

		const urlBase = this.isCollection() ? '/collections' : '/works'

		const url = `${urlBase}/${this.props.id}`

		return (
			<div style={styles.container}>
				{this.renderItemPosition()}
				{this.maybeRenderType()}

				<heading style={styles.header}>
					<Link to={url}>
						{mainTitle}
					</Link>

					<small style={styles.subtitle}>
						{subtitles.join('; ')}
					</small>
				</heading>

				{this.renderThumbnail()}

				<p style={styles.author}>{this.props.creator.join(', ')}</p>
				<p style={styles.format}>{this.props.format_medium}</p>

				{this.clearfix()}
			</div>
		)
	}
})

export default ResultsListItem
