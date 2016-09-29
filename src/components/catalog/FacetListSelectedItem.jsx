import React from 'react'

const T = React.PropTypes

const FacetListSelectedItem = React.createClass({
	propTypes: {
		color: T.string,
	},

	getDefaultProps: function () {
		return {
			color: '#d8ecd8',
		}
	},

	maybeRenderHits: function (props) {
		const hits = this.props.data.hits

		if (this.props.hideCount || (typeof hits !== 'number'))
			return

		return React.createElement('span', props, hits)
	},

	render: function () {
		const styles = {
			item: {
				color: this.props.color,
				margin: '5px 0',
				position: 'relative',
			},

			button: {

			},
			
			count: {
				right: '0',
				position: 'absolute',
			}
		}

		return (
			<div style={styles.item}>
				{this.props.data.label}
				<button
					children="x"
					onClick={this.props.onRemove.bind(null, this.props.data)}
					style={styles.button}
				/>

				{this.props.maybeRenderHits({style: style.count})}
			</div>
		)
	}
})

export default FacetListSelectedItem
