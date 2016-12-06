import React from 'react'
import 'openseadragon'

const T = React.PropTypes

const OpenSeadragonViewer = React.createClass({
	propTypes: {
		prefixUrl: T.string,
		tileSources: T.oneOfType([T.array, T.string]),
	},

	componentDidMount: function () {
		this.initOpenSeadragon()
	},

	shouldComponentUpdate: function () {
		return false
	},

	initOpenSeadragon: function (id) {
		console.log(this.props.tileSources);
		// create OpenSeadragon viewer
		this.viewer = OpenSeadragon({
			id: 'react-osd--viewer',
			prefixUrl: 'http://openseadragon.github.io/openseadragon/images/',
			tileSources:   [{
	      "@context": "http://iiif.io/api/image/2/context.json",
	      "@id": "http://libimages.princeton.edu/loris2/pudl0001%2F4609321%2Fs42%2F00000001.jp2",
	      "height": 7200,
	      "width": 5233,
	      "profile": [ "http://iiif.io/api/image/2/level2.json" ],
	      "protocol": "http://iiif.io/api/image",
	      "tiles": [{
	        "scaleFactors": [ 1, 2, 4, 8, 16, 32 ],
	        "width": 1024
      	}]
			}],
			degrees: 0,
			showRotationControl: true,
			gestureSettingsTouch:{
				pinchRotate: true
			}
		})
		// Add additional Controls(in this case only close button)
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
