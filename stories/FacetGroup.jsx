import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import FacetGroup from '../src/components/catalog/FacetGroup.jsx'
import assign from 'object-assign'

import data from './data/facets.json'

const findIdx = (arr, fn) => {
	for (let i = 0; i < arr.length; i++) {
		if (fn.call(arr, arr[i], i, arr))
			return i
	}

	return -1
}

const ExampleFacetGroup = React.createClass({
	getInitialState: function () {
		return {
			facets: this.props.facets,
			selectedFacets: {},
		}
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
			<div>
				<FacetGroup
					defaultFacetType="list-view-more"
					facets={this.state.facets}
					onRemoveSelectedFacet={this.handleFacetRemove}
					onSelectFacet={this.handleFacetSelect}
					selectedFacets={this.state.selectedFacets}
				/>

				<div style={{
					backgroundColor: '#ddd',
					display: 'inline-block',
					overflowX: 'scroll',
					position: 'absolute',
					right: '10px',
					top: '10px',
					width: '550px',
				}}>
					<pre>
					{JSON.stringify(this.state.selectedFacets, true, 2)}
					</pre>
				</div>
			</div>
		)
	}
})

storiesOf('<FacetGroup />', module)
	.add('it works!', () => (
		<ExampleFacetGroup facets={data}/>
	))
