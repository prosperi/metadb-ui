import React from 'react'
import PDFViewerTemplate from './PDFViewerTemplate.jsx'

const T = React.PropTypes

const PDFViewer = React.createClass({
	propTypes: {
		src: T.string
	},

	componentDidMount() {
		webViewerLoad(this.props.src)
	},

	render: function() {
		return (
			<div className="pdfjs">
				<PDFViewerTemplate/>
				<script src="/bundle.js"></script>
				<script src="//mozilla.github.io/pdf.js/web/l10n.js"></script>
				<script src="//mozilla.github.io/pdf.js/build/pdf.js"></script>
				<script src="/viewer.js"></script>
			</div>
		)
	}
})

export default PDFViewer
