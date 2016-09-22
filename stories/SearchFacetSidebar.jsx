import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import SearchFacetSidebar from '../src/components/catalog/SearchFacetSidebar.jsx'
import assign from 'object-assign'

import data from './data/facets.json'

const findIdx = (arr, fn) => {
	for (let i = 0; i < arr.length; i++) {
		if (fn.call(arr, arr[i], i, arr))
			return i
	}

	return -1
}

const ExampleSidebar = React.createClass({
	getInitialState: function () {
		return {
			facets: this.props.facets,
			selectedFacets: {},
		}
	},

	clearSelectedFacets: function () {
		const facets = [].concat(this.state.facets)
		const keys = Object.keys(this.state.selectedFacets)

		// return the selectedFacets to their home
		keys.forEach(k => {
			const idx = findIdx(facets, f => f.name === k)
			facets[idx].items = facets[idx].items.concat(this.state.selectedFacets[k])
		})

		this.setState({facets, selectedFacets: {}})
	},

	handleFacetSelect: function (name, facet) {
		const selected = assign({}, this.state.selectedFacets)

		// add it to the selected pool
		if (selected[name])
			selected[name] = [].concat(selected[name], facet)
		else
			selected[name] = [facet]

		// + remove it from the facet pool
		const facets = [].concat(this.state.facets)
		const idx = findIdx(facets, fg => fg.name === name)
		const items = facets[idx].items

		facets[idx].items = items.filter(f => f.value !== facet.value)

		this.setState({
			selectedFacets: selected,
			facets,
		})
	},

	handleFacetRemove: function (name, facet) {
		const pool = assign({}, this.state.selectedFacets)
		pool[name] = pool[name].filter(f => f.value !== facet.value)

		if (!pool[name].length)
			delete pool[name]

		const facets = [].concat(this.state.facets)
		const idx = findIdx(facets, fg => fg.name === name)
		facets[idx].items = [].concat(facets[idx].items, facet)

		this.setState({selectedFacets: pool, facets})
	},

	render: function () {
		return (
			<SearchFacetSidebar
				facets={this.state.facets}
				clearSelectedFacets={this.clearSelectedFacets}
				onRemoveSelectedFacet={this.handleFacetRemove}
				onSelectFacet={this.handleFacetSelect}
				onSubmitSearchQuery={action('new query!')}
				selectedFacets={this.state.selectedFacets}
			/>
		)
	}
})

storiesOf('<SearchFacetSidebar />', module)
	.add('in-state example', () => (
		<div style={{width: '100%'}}>
			<ExampleSidebar facets={data} />
		</div>
	))
