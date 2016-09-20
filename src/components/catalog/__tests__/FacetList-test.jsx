import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import assign from 'object-assign'
import randomIndex from 'random-array-index'
import FacetList from '../FacetList.jsx'

const defaultProps = {
	label: 'Facet List Label',
	name: 'facet_list_name',
	items: [
		{
			label: 'label 1',
			hits: 4,
			value: 'value_1',
		},
		{
			label: 'label_2',
			hits: 10,
			value: 'value_2',
		},
		{
			label: 'label_3',
			hits: 7,
			value: 'value_3',
		}
	],
	onSelect: () => {},
	selectedValues: [],
}

const renderEl = (xtend, renderer) => {
	const props = assign({}, defaultProps, xtend)
	return renderer(React.createElement(FacetList, props))
}

const mountEl = xtend => renderEl(xtend, mount)
const shallowEl = xtend => renderEl(xtend, shallow)

xdescribe('<FacetList />', function () {
	it('renders `FacetListItem`s for each item passed', function () {
		const $el = shallowEl()
		expect($el.find('FacetListItem')).to.have.length(defaultProps.items.length)
	})

	it('retains the order of items passed', function () {
		const $el = shallowEl()
		const $listItems = $el.find('FacetListItem')

		$listItems.forEach(($li, index) => {
			expect($li.prop('hits')).to.equal(defaultProps.items[index].hits)
		})
	})

	it('calls `onSelect` when an Item is clicked, passing the List name + facet object', function (done) {
		const idx = randomIndex(defaultProps.items)
		const item = defaultProps.items[idx]

		const onSelect = facet => {
			expect(facet).to.deep.equal(item)
			done()
		}

		const $el = mountEl({onSelect})
		const $item = $el.find('FacetListItem').at(idx)
		$item.find('.facet-label').simulate('click')
	})
})
