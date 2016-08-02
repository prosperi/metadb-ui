import React from 'react'
import { TacoTable, DataType } from 'react-taco-table'
import Link from 'react-router/lib/Link'

const T = React.PropTypes

const SearchResultsTable = React.createClass({
	propTypes: {
		data: T.arrayOf(T.shape({
			thumbnail: T.string,
			collection: T.number,
			id: T.number,
			metadata: T.oneOfType([T.object, T.string]),
		})),
	},

	columns: function () {
		return [
			{
				id: 'thumbnail',
				type: DataType.None,
				header: 'Thumbnail',
				renderer: this.renderThumbnail,
				className: 'search-result--thumbnail',
			},
			{
				id: 'collectionId',
				type: DataType.String,
				header: 'Collection',
				renderer: this.renderCollectionId,
				className: 'search-result--collection',
			},
			{
				id: 'itemId',
				type: DataType.Number,
				header: 'Item ID',
				className: 'search-result--item',
			},
			{
				id: 'metadata',
				type: DataType.None,
				header: 'Metadata',
				renderer: this.renderMetadata,
				className: 'search-result--metadata'
			},
		]
	},

	renderCollectionId: function (cellData) {
		return <Link to={`/collections/${cellData}`}>{cellData}</Link>
	},

	renderMetadata: function (cellData) {
		const keys = Object.keys(cellData)
		return (
			<div>
				{keys.map((key, idx) => (
					<p key={idx}><strong>{key}:</strong> {cellData[key]}</p>
				))}
			</div>
		)
	},

	renderThumbnail: function (cellData) {
		return <img src={cellData} />
	},

	render: function () {
		return (
			<TacoTable columns={this.columns()} data={this.props.data} />
		)
	}
})

export default SearchResultsTable
