import React from 'react'
import Modal from 'react-modal'
import FacetList from './FacetList.jsx'
import FacetListItem from './FacetListItem.jsx'
import SelectedFacetsList from './SelectedFacetsList.jsx'

const T = React.PropTypes

const FacetListWithViewMore = React.createClass({
	propTypes: {
		data: T.shape({
			label: T.string.isRequired,
			name: T.string.isRequired,
			items: T.array.isRequired,
		}).isRequired,

		onRemoveSelectedFacet: T.func.isRequired,
		onSelectFacet: T.func.isRequired,
		selectedFacets: T.array.isRequired,

		limit: T.number,
		modalColor: T.string,
		viewMoreText: T.string,
	},

	getDefaultProps: function () {
		return {
			limit: 5,
			modalColor: '#1d5f83',
			seeMoreText: 'View more...',
		}
	},

	getInitialState: function () {
		return {
			modalOpen: false,
		}
	},

	handleRemoveSelectedFacet: function () {
		if (this.state.modalOpen)
			this.setState({modalOpen: false})

		this.props.onSelectFacet.apply(null, arguments)
	},

	handleSelectFacet: function () {
		if (this.state.modalOpen)
			this.setState({modalOpen: false})

		this.props.onSelectFacet.apply(null, arguments)
	},

	maybeRenderModal: function () {
		if (!this.state.modalOpen)
			return

		const modalPaddingVal = 20
		const modalPadding = modalPaddingVal + 'px'

		const styles = {
			header: {
				backgroundColor: this.props.modalColor,
				color: '#fff',
				marginBottom: modalPadding,
				marginLeft: '-' + modalPadding,
				marginRight: '-' + modalPadding,
				marginTop: '-' + modalPadding,
				padding: (modalPaddingVal / 2) + 'px',
				textAlign: 'center',
			},
			modal: {
				content: {
					borderColor: this.props.modalColor,
					bottom: '33%',
					left: '33%',
					padding: modalPadding,
					right: '33%',
					top: '10%',
				},
			},
		}

		return (
			<Modal
				isOpen={this.state.modalOpen}
				onRequestClose={this.toggleModal}
				style={styles.modal}
			>
				<header style={styles.header}>
					Viewing all for <strong>{this.props.data.name}</strong>
				</header>
				<FacetList
					data={this.props.data}
					onSelectFacet={this.handleSelectFacet}
					onRemoveSelectedFacet={this.handleRemoveSelectedFacet}
					selectedFacets={this.props.selectedFacets}
				/>
			</Modal>
		)
	},

	renderLimitedFacetList: function () {
		const { data, limit, onSelectFacet } = this.props
		const { items, name } = data

		const els = []
		let i = 0
		let item, props, el

		for (let i = 0; i < limit; i++) {
			item = items[i]

			props = {
				data: item,
				key: name + i,
				onClick: this.handleSelectFacet,
			}

			el = React.createElement(FacetListItem, props)
			els.push(el)
		}

		// no need to add a `view more` link if there aren't more to view
		if (items.length <= limit)
			return els

		const seeMoreLink = React.createElement('span', {
			onClick: this.toggleModal,
			style: {
				borderBottom: '1px dotted #aaa',
				cursor: 'pointer',
				fontWeight: 'bold',
			}
		}, this.props.seeMoreText)

		const seeMoreItem = React.createElement('li', {
			style: {
				marginTop: '5px',
			}
		}, seeMoreLink)

		return [].concat(els, seeMoreItem)
	},

	renderSelectedFacets: function () {
		const selected = this.props.selectedFacets
		if (!selected.length)
			return

		return (
			<SelectedFacetsList
				facets={selected}
				onRemove={this.handleRemoveSelectedFacet}
			/>
		)
	},

	toggleModal: function () {
		this.setState({modalOpen: !this.state.modalOpen})
	},

	render: function () {
		const styles = {
			list: {
				listStyleType: 'none',
				margin: '0',
				padding: '0',
			}
		}

		return (
			<div>
				{this.renderSelectedFacets()}
				<ul style={styles.list}>
					{this.renderLimitedFacetList()}
				</ul>

				{this.maybeRenderModal()}
			</div>
		)
	}
})

export default FacetListWithViewMore
