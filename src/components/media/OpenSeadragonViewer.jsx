import React from 'react'
import 'openseadragon'

const T = React.PropTypes

const OpenSeadragonViewer = React.createClass({
	propTypes: {
		prefixUrl: T.string,
		tileSources: T.oneOfType([T.array, T.string]),
		sequenceMode: T.bool,
		showReferenceStrip: T.bool,
		referenceStripScroll: T.string,
		showNavigator: T.bool,
		onClose: T.func
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
			prefixUrl: this.props.prefixUrl,
			tileSources: this.props.tileSources,
			sequenceMode: this.props.sequenceMode,
    	showReferenceStrip: this.props.showReferenceStrip,
			referenceStripScroll: this.props.referenceStripScroll,
			showNavigator:  this.props.showNavigator
		})

		var additionalControls = [];
		var closeButton = new OpenSeadragon.Button({
			tooltip: "Close Viewer",
			onClick: this.props.onClose,
			srcRest: "http://icons.iconarchive.com/icons/custom-icon-design/mono-general-1/32/close-icon.png",
			srcGroup: "http://icons.iconarchive.com/icons/custom-icon-design/mono-general-1/32/close-icon.png",
			srcHover: "http://icons.iconarchive.com/icons/custom-icon-design/mono-general-1/32/close-icon.png",
			srcDown: "http://icons.iconarchive.com/icons/custom-icon-design/mono-general-1/32/close-icon.png"
		});
		additionalControls.push(closeButton);
		var URButtonGroup = new OpenSeadragon.ButtonGroup({buttons: additionalControls});

		this.viewer.addControl(URButtonGroup.element, {
			anchor: OpenSeadragon.ControlAnchor.TOP_RIGHT
		});
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
