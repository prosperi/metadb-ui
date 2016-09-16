import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import assign from 'object-assign'
import randomBool from 'random-bool'
import FacetListItem from '../FacetListItem.jsx'

const defaultProps = {
	hits: 10,
	label: 'test label',
	value: 'test_value',
	onChange: () => {},
}

const mountEl = (xtend) => {
	const props = assign({}, defaultProps, xtend)
	return mount(React.createElement(FacetListItem, props))
}

describe('<FacetListItem />', function () {
	it('renders an <li>', function () {
		const $el = mountEl()
		expect($el.find('li')).to.have.length(1)
	})

	it('renders a `span.facet-count` of the `hits` by default', function () {
		const hits = Math.floor(Math.random() * 1000)
		const $el = mountEl({hits})
		const $span = $el.find('span.facet-count')
		expect($span).to.have.length(1)
		expect(parseInt($span.text(), 10)).to.equal(hits)
	})

	it('hides the `hits` count when `hideCount` is true', function () {
		const $el = mountEl({hideCount:true})
		expect($el.find('span.facet-count')).to.have.length(0)
	})

	it('calls `onChange` when clicked + passes the value + next `selected` value', function (done) {
		const props = {
			label: 'new test label',
			selected: randomBool(),
			value: 'hullo I am the value!',
			onChange: (value, selected) => {
				expect(value).to.equal(props.value)
				expect(selected).to.equal(!props.selected)
				done()
			},
		}

		const $el = mountEl(props)
		$el.find('span').first().simulate('click')
	})
})
