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
	onChange: () => {},
	selectedValues: [],
}

const renderEl = (xtend, renderer) => {
	const props = assign({}, defaultProps, xtend)
	return renderer(React.createElement(FacetList, props))
}

const mountEl = xtend => renderEl(xtend, mount)
const shallowEl = xtend => renderEl(xtend, shallow)

describe('<FacetList />', function () {
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

	it('toggles an Item as `selected` when value included in `selectedValues`', function () {
		const idx = randomIndex(defaultProps.items)
		const selectedVal = defaultProps.items[idx].value

		const $el = shallowEl({selectedValues: [selectedVal]})	
		$el.find('FacetListItem').forEach(($item, index) => {
			if (index === idx)
				expect($item.prop('selected')).to.be.true
			else
				expect($item.prop('selected')).to.be.false
		})
	})

	it('calls `onChange` when an Item is clicked, passing the List name + Item value', function (done) {
		const idx = randomIndex(defaultProps.items)
		const item = defaultProps.items[idx]

		const onChange = (name, value) => {
			expect(name).to.equal(defaultProps.name)
			expect(value).to.equal(item.value)
			done()
		}

		const $el = mountEl({onChange})
		const $item = $el.find('FacetListItem').at(idx)
		$item.find('span').first().simulate('click')
	})
})
