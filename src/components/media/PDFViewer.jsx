import React from 'react'
import PDFViewerTemplate from './PDFViewerTemplate.jsx'

// this imports are not used yet, ad PDFWorker provides a document, while
// we need just url of pdf.worker.js. Same goes for PDFTestFile, we need to know
// exact location, we do not need document yet(document is loaded in pdf.js)
import PDFTestFile from 'pdfTestFile'
import PDFWorker from 'pdfWorker'

const PDFViewer = React.createClass({
	componentDidMount(){
		// load pdf.js after the component mounts
		// could be improved by restructuring pdf.js, but
		// we should think about that carefully as pdf.js is an important
		// component of the whole bower component.
		require('../../../bower_components/pdf.js-viewer/pdf.js')
		// providing urls for workerSrc and pdf, while we should be able to provide
		// relative path, not absolute one.
		PDFJS.workerSrc = 'https://raw.githubusercontent.com/legalthings/pdf.js-viewer/master/pdf.worker.js';
		PDFJS.webViewerLoad('http://localhost:8080/DraftReport.pdf');

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
