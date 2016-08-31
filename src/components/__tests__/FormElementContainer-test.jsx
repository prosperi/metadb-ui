import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import assign from 'object-assign'

import FormElementContainer from '../FormElementContainer.jsx'
import TextInput from '../form-elements/TextInput.jsx'

describe('<FormElementContainer/>', function () {
	const wrapElement = (xtend, numberOfKids) => {
		const children = []

		if (typeof numberOfKids === 'undefined')
			numberOfKids = 1

		for (let i = 0; i < numberOfKids; i++)
			children.push(<TextInput/>)

		const props = assign({}, {onChange: () => {}}, xtend, {children})

		return mount(<FormElementContainer {...props}/>)
	}

	it('does not render a <label/> by default', function () {
		const $el = wrapElement()
		expect($el.find('label')).to.have.length(0)
	})

	it('renders a <label/> element when `label` prop passed', function () {
		const label = 'testLabel'
		const $el = wrapElement({label})

		const $label = $el.find('label')

		expect($label).to.have.length(1)
		expect($label.text()).to.equal(label)
	})

	it('calls `onChange` with the index and value of changed child', function (done) {
		const numberOfKids = Math.ceil(Math.random() * 5)
		const testVal = 'I am test value, AMA'

		const onChange = (index, value) => {
			expect(index).to.equal(numberOfKids - 1)
			expect(value).to.equal(testVal)

			done()
		}

		const $el = wrapElement({onChange: onChange}, numberOfKids)
		const $target = $el.find('TextInput').last()

		$target.simulate('blur', {target: {value: testVal}})
	})

	it('triggers `onAddValueField` when plus button is pressed', function (done) {
		const onAddValueField = () => {
			expect(true).to.equal(true)
			done()
		}

		const $el = wrapElement({onAddValueField})
		const $add = $el.find('button').last()

		$add.simulate('click')
	})

	it('triggers `onRemoveValueField` when minus button is pressed', function (done) {
		const onRemoveValueField = (index) => {
			expect(index).to.equal(0)	
			done()
		}

		const $el = wrapElement({onRemoveValueField}, 2)
		const $remove = $el.find('button').first()

		$remove.simulate('click')
	})

	it('does not render add/remove buttons when `multipleValues` is false', function () {
		const $el = wrapElement({multipleValues: false})

		expect($el.find('button')).to.have.length(0)
	})

	it('renders `add-row-btn` as last element', function () {
		const numberOfKids = Math.ceil(Math.random() * 5)
		const $el = wrapElement({}, numberOfKids)

		expect($el.children().last().hasClass('add-row-btn')).to.be.true
	})
})
