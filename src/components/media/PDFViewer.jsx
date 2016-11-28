import React from 'react'
import PDFViewerTemplate from './PDFViewerTemplate.jsx'

const PDFViewer = React.createClass({
	componentDidMount(){
		require('../../../bower_components/pdf.js-viewer/pdf.js')
		PDFJS.workerSrc = 'http://localhost:8080/pdf.worker.js';
		PDFJS.webViewerLoad('http://localhost:8080/DraftReport.pdf');
		console.log(PDFJS);
	},

	render(){
		return (
			<div className="pdfjs">
				<PDFViewerTemplate/>
			</div>
		)
	}
})

export default PDFViewer
