import React from 'react'
import 'openseadragon'

const T = React.PropTypes

const OpenSeadragonViewer = React.createClass({
	propTypes: {
		prefixUrl: T.string,
		tileSources: T.oneOfType([T.array, T.string]),
		sequenceMode: T.bool,
		showReferenceStrip: T.bool,
		referenceStripScroll: T.string
	},

	componentDidMount: function () {
		this.initOpenSeadragon()
	},

	shouldComponentUpdate: function () {
		return false
	},

	initOpenSeadragon: function () {
		this.viewer = OpenSeadragon({
			id: 'react-osd--viewer',
			prefixUrl: 'http://openseadragon.github.io/openseadragon/images/',
			tileSources: this.props.tileSources,
			sequenceMode: this.props.sequenceMode,
    	showReferenceStrip: this.props.showReferenceStrip,
			referenceStripScroll: this.props.referenceStripScroll
		})
	},

	render: function () {
		const style = {
			height: '600px',
			width: '800px',
			verticalAlign: 'top',
		}

		return (
			<div className="openseadragon-container" id="react-osd--viewer" style={style}></div>
		)
	}
})

export default OpenSeadragonViewer
