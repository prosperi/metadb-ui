// tabular display of terms in a vocabulary
import React from 'react'

const T = React.PropTypes

const TermsList = React.createClass({
	renderHeadings: function () {
		const keys = Object.keys(this.props.terms[0])
		return (
			<tr>
				{keys.map((k,i) => <th key={i}>{k}</th>)}
			</tr>
		)
	},

	renderRow: function (data, index) {
		const keys = Object.keys(data)

		return (
			<tr>
				{
					keys.map((k, i) => (
						<td key={i}>{data[k]}</td>
					))
				}
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
		console.log(this.props.terms)
		return (
			<table className="vocabulary-terms-list">
				<caption>
					{this.props.vocabulary}
				</caption>

				<thead>
					{this.renderHeadings()}
				</thead>

				<tbody>
					{this.props.terms.map(this.renderRow)}
				</tbody>
			</table>
		)
	}
})

export default TermsList
