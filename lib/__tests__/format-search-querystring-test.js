import { expect } from 'chai'
import formatSearchQuerystring from '../format-search-querystring'

describe('lib/format-search-querystring', function () {
	it('formats facet keys properly', function () {
		const query = 'cat'
		const facets = {
			one: [
				{value: 'a', label: 'A'},
				{value: 'b', label: 'B'},
			]
		}

		const expected = 'q=cat&f[one][]=a&f[one][]=b'
			.replace(/\[/g, '%5B')
			.replace(/\]/g, '%5D')

		expect(formatSearchQuerystring(query, facets)).to.equal(expected)
	})

	it('appends options as-is', function () {
		const query = 'cat AND dog'
		const facets = {
			one: [
				{value: 'a', label: 'A'},
				{value: 'b', label: 'B'},
			], 
			two: [
				{value: 'c', label: 'A'}, 
				{value: 'd', label: 'B'}
			]
		}
		const options = {per_page: 25, format: 'json'}

		const expected = [
			'q=cat AND dog',
			'per_page=25&format=json',
			'f[one][]=a&f[one][]=b&f[two][]=c&f[two][]=d'
		].join('&')
		.replace(/ /g, '%20')
		.replace(/\[/g, '%5B')
		.replace(/\]/g, '%5D')

		expect(formatSearchQuerystring(query, facets, options)).to.equal(expected)
	})

	it('will work without facets and options', function () {
		const query = 'cats AND dogs'
		const expected = 'q=cats%20AND%20dogs'

		expect(formatSearchQuerystring(query)).to.equal(expected)
	})

	// via https://searchworks.stanford.edu
	it('matches a real-world example', function () {
		const query = 'cat'
		const facets = {
			'format_physical_ssim': [
				{value: 'DVD', label: 'DVD'},
				{value: 'Blu-ray', label: 'Blu-ray'},
			]
		}
		const options = {
			per_page: 10,
			search_field: 'search',
		}
		const expected = 'q=cat&per_page=10&search_field=search&f%5Bformat_physical_ssim%5D%5B%5D=DVD&f%5Bformat_physical_ssim%5D%5B%5D=Blu-ray'

		expect(formatSearchQuerystring(query, facets, options)).to.equal(expected)
	})
})
