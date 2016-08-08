// tabular display of terms in a vocabulary
import React from 'react'

const T = React.PropTypes

const TermsList = React.createClass({
	renderRow: function (data, index) {
		return (
			<tr key={index}>
				{this.renderTermCell(data.term, index)}
				{this.renderUriCell(data.uri, index)}
			</tr>
		)
	},

	renderTermCell: function (val, i) {
		return (
			<td
				className="term"
				key={val+i}
			>
				{val}
			</td>
		)
	},

	renderUriCell: function (uri, i) {
		return (
			<td className="uri" key={uri+i}>
				<a href={uri} target="_blank">{uri}</a>
			</td>
		)
	},

	render: function () {
		return (
			<table className="vocabulary-terms-list">
				<caption>
					{this.props.vocabulary}
				</caption>

				<thead>
					<tr>
						<th>term</th>
						<th>uri</th>
					</tr>
				</thead>

				<tbody>
					{this.props.terms.map(this.renderRow)}
				</tbody>
			</table>
		)
	}
})

export default TermsList
