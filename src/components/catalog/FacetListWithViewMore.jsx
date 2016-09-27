import React from 'react'
import Modal from 'react-modal'
import FacetList from './FacetList.jsx'
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

		// determines whether or not the View More modal is open on mount.
		// this is mostly as a means to test the modal w/o having to trigger
		// it on each test.
		// (default: `false`)
		modalOpen: T.bool,

		// text used for `View more...` link/span that will trigger modal open.
		viewMoreText: T.string,
	},

	getDefaultProps: function () {
		return {
			limit: 5,
			modalColor: '#1d5f83',
			modalOpen: false,
			viewMoreText: 'View more...',
		}
	},

	getInitialState: function () {
		return {
			modalOpen: this.props.modalOpen,
		}
	},

	handleRemoveSelectedFacet: function () {
		if (this.state.modalOpen)
			this.setState({modalOpen: false})

		this.props.onRemoveSelectedFacet.apply(null, arguments)
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
				key="dss-flwvm-modal"
				onRequestClose={this.toggleModal}
				style={styles.modal}
			>
				<header key="dss-flmvw-modal-header" style={styles.header}>
					Viewing all for <strong>{this.props.data.name}</strong>
				</header>
				<FacetList
					data={this.props.data}
					key="dss-flmvw-modal-list"
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

		const abbreviatedItems = items.slice(0, limit)
		const limitedList = (
			<FacetList
				data={{...data, items: abbreviatedItems}}
				key="dss-flwvm-list"
				onSelectFacet={this.handleSelectFacet}
				onRemoveSelectedFacet={this.handleRemoveSelectedFacet}
				selectedFacets={this.props.selectedFacets}
			/>
		)

		// no need to add a `view more` link if there aren't more to view
		if (items.length <= limit)
			return limitedList

		const seeMoreLink = React.createElement('span', {
			className: 'view-more',
			key: 'dss-fpwvm-view-more',
			onClick: this.toggleModal,
			style: {
				borderBottom: '1px dotted #aaa',
				cursor: 'pointer',
				display: 'inline-block',
				fontWeight: 'bold',
				marginTop: '10px',
			}
		}, this.props.viewMoreText)

		return [limitedList, seeMoreLink]
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
				{this.renderLimitedFacetList()}
				{this.maybeRenderModal()}
			</div>
		)
	}
})

export default FacetListWithViewMore
