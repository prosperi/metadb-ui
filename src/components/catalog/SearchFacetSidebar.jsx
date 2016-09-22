import React from 'react'
import FacetGroup from './FacetGroup.jsx'
import Button from '../Button.jsx'

const T = React.PropTypes

const SearchFacetSidebar = React.createClass({
	propTypes: {
		facets: T.array.isRequired,

		onRemoveSelectedFacet: T.func.isRequired,
		onSelectFacet: T.func.isRequired,
		onSubmitSearchQuery: T.func.isRequired,
		selectedFacets: T.object.isRequired,

		query: T.string,
	},

	handleKeyDown: function (ev) {
		if (ev.keyCode === 13)
			this.props.onSubmitSearchQuery(ev.target.value)
	},

	renderFacetGroup: function () {
		return (
			<FacetGroup
				facets={this.props.facets}
				onRemoveSelectedFacet={this.props.onRemoveSelectedFacet}
				onSelectFacet={this.props.onSelectFacet}
				selectedFacets={this.props.selectedFacets}
			/>
		)
	},

	renderSearchHeader: function () {
		const styles = {
			container: {
				marginBottom: '10px',
			},
			input: {
				width: '100%',
			}
		}

		// TODO: this button isn't rendering correctly
		const button = !Object.keys(this.props.selectedFacets).length ? null : (
			<Button
				onClick={this.props.clearSelectedFacets}
				size="small"
				style={{margin: '5px 0', width: '100%'}}
			>
				Clear facets
			</Button>
		)

		return (
			<div style={styles.container}>
				<input
					onKeyDown={this.handleKeyDown}
					style={styles.input}
					type="search"
				/>
				{button}
			</div>
		)
	},

	render: function () {
		const sidebarStyles = {
			// TODO: maybe get rid of this border
			borderRight: '1px solid #ccc',
			paddingRight: '10px',
			width: '25%',
		}

		return (
			<div style={sidebarStyles}>
				{this.renderSearchHeader()}
				{this.renderFacetGroup()}
			</div>
		)
	}
})

export default SearchFacetSidebar
