import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import assign from 'object-assign'

import VocabularyMetadataFormFields from '../VocabularyMetadataFormFields.jsx'

const defaultDataset = {
	uri: 'http://example.com/ns/testTerm',
	label: ['Test Term 1', 'Another Test Term Label'],
	alt_label: ['Alternative Label'],
	hidden_label: [],
	pref_label: ['Another Test Term Label'],
}

const noop = () => {}

const wrapElement = (xtend, renderer) => {
	const props = assign({}, {
		data: defaultDataset,
		onAddValueField: noop,
		onChange: noop,
		onRemoveValueField: noop,
	}, xtend)

	return renderer(<VocabularyMetadataFormFields {...props} />)
}

const shallowWrap = xtend => wrapElement(xtend, shallow)
const mountWrap = xtend => wrapElement(xtend, mount)

describe('<VocabularyMetadataFormFields />', function () {
	it('contains FormElementContainers for all `data` keys', function () {
		const $el = shallowWrap()
		const $formEls = $el.find('FormElementContainer')

		const dataKeyLength = Object.keys(defaultDataset).length

		expect($formEls).to.have.length(dataKeyLength)
	})

	it('skips keys in `ignoreKeys` array', function () {
		const ignoreKeys = ['uri', 'hidden_label']
		const $el = shallowWrap({ignoreKeys})
		const $formEls = $el.find('FormElementContainer')

		const datasetLength = Object.keys(defaultDataset).length
		const sizeWithoutIgnoreKeys = datasetLength - ignoreKeys.length

		expect($formEls).to.have.length(sizeWithoutIgnoreKeys)
	})

	it('renders empty inputs for empty fields', function () {
		const field = 'hidden_label'

		// bail early if this field doesn't exist
		expect(defaultDataset[field]).to.have.length(0)

		const $el = mountWrap()
		const $formEls = $el.find('FormElementContainer')
		const $hidden = $formEls.findWhere(el => el.prop('label') === field)

		expect($hidden.find('input')).to.have.length(1)

	})

	it('binds approprate data to `onChange`', function () {
		let everythingIsOk = false

		const expectKey = 'alt_label'
		const expectIndex = 0
		const expectValue = 'new value!'

		const onChange = (key, index, value) => {
			if (key !== expectKey) return
			if (index !== expectIndex) return
			if (value !== expectValue) return

			everythingIsOk = true
		}

		const $el = mountWrap({onChange})

		// this is a lil' convoluted
		const $formEls = $el.find('FormElementContainer')
		const $alt = $formEls.findWhere(el => el.prop('label') === expectKey)
		const $input = $alt.find('TextInput').at(expectIndex)

		$input.simulate('blur', {target: {value: expectValue}})

		expect(everythingIsOk).to.be.true
	})

	it('generates `pref_label` `<option/>`s for every (array) value field', function () {
		const valueCount = Object.keys(defaultDataset).reduce((prev, currentKey) => {
			if (currentKey === 'pref_label')
				return prev

			const val = defaultDataset[currentKey]
			
			if (!Array.isArray(val))
				return prev

			return prev + val.length
		}, 0)

		const $el = mountWrap()

		expect($el.find('option')).to.have.length(valueCount)
	})
})
