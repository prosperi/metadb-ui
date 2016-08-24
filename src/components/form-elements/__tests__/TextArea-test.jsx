import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import assign from 'object-assign'

import TextArea from '../TextArea.jsx'

describe('<TextArea/>', function () {
	const wrapComponent = xtend => {
		const props = assign({}, xtend)
		return shallow(<TextArea {...props} />)
	}

	it('renders as an <textarea /> element', function () {
		const el = wrapComponent()
		expect(el.is('textarea')).to.equal(true)
	})

	it('only triggers onChange when blurred', function (done) {
		const expected = 'some value!'
		const onChange = val => {
			expect(val).to.equal(expected)
			done()
		}
		
		const el = wrapComponent({onChange})

		el.simulate('change', {target: {value: 'change!'}})
		el.simulate('blur', {target: {value: expected}})
	})

	it('does not trigger onChange if value remains unchanged', function () {
		let count = 0
		const onChange = () => count++
		const val = 'value'

		const el = wrapComponent({onChange, value: val})

		el.simulate('focus', {target: {value: val}})
		el.simulate('blur', {target: {value: val}})

		expect(count).to.equal(0)
	})

	it('does not trigger onChange if readOnly', function () {
		let count = 0
		const onChange = () => count++
		const el = wrapComponent({onChange, readOnly: true})

		el.simulate('blur', {target: {value: 'value'}})

		expect(count).to.equal(0)
	})

	it('does not trigger onChange if disabled', function () {
		let count = 0
		const onChange = () => count++
		const el = wrapComponent({onChange, disabled: true})

		el.simulate('blur', {target: {value: 'value'}})

		expect(count).to.equal(0)
	})
})
