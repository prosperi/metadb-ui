import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import assign from 'object-assign'
import randomIndex from 'random-array-index'
import SelectedFacetsList from '../SelectedFacetsList.jsx'

const defaultProps = {
	facets: [
		{
			label: 'Facet Label 1',
			value: 'facet_value_1',
			hits: 23,
		},
		{
			label: 'Facet Label 2',
			value: 'facet_value_2',
			hits: 311,
		},
	],
	onRemove: () => {},
}

const mountEl = xtend => {
	const props = assign({}, defaultProps, xtend)
	return mount(React.createElement(SelectedFacetsList, props))
}

describe('<SelectedFacetsList />', function () {
	it('does not render if no facets are passed', function () {
		const $el = mountEl({facets: []})
		expect($el.children().isEmpty()).to.be.true
	})

	it('renders an <li> for each facet', function () {
		const $el = mountEl()
		expect($el.find('li')).to.have.length(defaultProps.facets.length)
	})

	it('sets the hover index when the `remove` button is `mouseOver`d', function () {
		const idx = randomIndex(defaultProps.facets)
		const $rent = mountEl()
		const $button = $rent.find('li').at(idx).find('button')

		$button.simulate('mouseOver')
		expect($rent.state('xHoverIdx')).to.equal(idx)

		$button.simulate('mouseOut')
		expect($rent.state('xHoverIdx')).to.equal(-1)
	})

	it('triggers `onRemove` + passes facet info when `remove` button is clicked', function (done) {
		const idx = randomIndex(defaultProps.facets)
		const onRemove = facet => {
			expect(facet).to.deep.equal(defaultProps.facets[idx])
			done()
		}

		const $rent = mountEl({onRemove})
		const $buttons = $rent.find('button')

		// make sure the same # of X buttons matches facets
		expect($buttons).to.have.length(defaultProps.facets.length)

		const $button = $buttons.at(idx)
		$button.simulate('click')
	})
})
