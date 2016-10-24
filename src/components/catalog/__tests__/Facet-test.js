import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import assign from 'object-assign'
import Facet from '../Facet.jsx'

import data from './data/facet.json'

const noop = () => {}

const defaultProps = {
	data,
	onRemoveSelectedFacet: noop,
	onSelectFacet: noop,
	open: true,
}

const wrap = (xtend, renderer) => {
	const props = assign({}, defaultProps, xtend)
	return renderer(React.createElement(Facet, props))
}

const shallowEl = xtend => wrap(xtend, shallow)

describe('<Facet />', function () {
	it('renders a `FacetList` element by default', function () {
		const $el = shallowEl()
		expect($el.find('FacetList')).to.have.length(1)
	})

	it('uses the `bodyComponent` prop to render the body', function () {
		const SomeFacetBody = (props) => (<h1>hiii</h1>)

		const $el = shallowEl({bodyComponent: SomeFacetBody})
		expect($el.find('SomeFacetBody')).to.have.length(1)
	})

	it('hides `.facet-panel--body` when `open` prop is false', function () {
		const $el = shallowEl({open: false})
		expect($el.find('.facet-panel--body')).to.have.length(0)
	})

	it('toggles `.facet-panel--body` when the header is clicked', function () {
		const $el = shallowEl({open: false})
		expect($el.state('open')).to.be.false
		expect($el.find('.facet-panel--body')).to.have.length(0)

		$el.find('header').simulate('click')

		expect($el.find('.facet-panel--body')).to.have.length(1)
		expect($el.state('open')).to.be.true
	})
})
