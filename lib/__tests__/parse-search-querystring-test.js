import { expect } from 'chai'
import parseQs from '../parse-search-querystring'

const hasProp = Object.prototype.hasOwnProperty

describe('lib/parse-search-querystring', function () {
	it('returns an object with `query`, `options` and `facets` keys', function () {
		const parsed = parseQs('q=cats&f[animal][]=cool&per_page=25')
		expect(hasProp.call(parsed, 'query')).to.be.true
		expect(hasProp.call(parsed, 'options')).to.be.true
		expect(hasProp.call(parsed, 'facets')).to.be.true
	})

	it('strips facet formatting for keys', function () {
		const str = 'f[one][]=1&f[one][]=2&f[two][]=1'
		const facets = {
			one: ['1', '2'],
			two: ['1']
		}

		expect(parseQs(str).facets).to.deep.equal(facets)
	})
})
