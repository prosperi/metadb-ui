import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import randomIndex from 'random-array-index'

import * as actions from '../actions'

import {
	testVocabulary as VOCAB_ONE,
} from '../../vocabulary/__tests__/data/vocabularies-with-terms'

const mockStore = configureMockStore([thunk])
const API_BASE = process.env.API_BASE_URL

const expectTerm = term => {
	expect(term).to.be.an('object')
	expect(term).to.have.property('uri')
	expect(term).to.have.property('label')
	expect(term).to.have.property('alt_label')
	expect(term).to.have.property('pref_label')
	expect(term).to.have.property('hidden_label')

	expect(term.uri).to.be.a('string')

	expect(term.label).to.be.an('array')
	expect(term.alt_label).to.be.an('array')
	expect(term.pref_label).to.be.an('array')
	expect(term.hidden_label).to.be.an('array')
}

describe('Terms actionCreators', function () {
	beforeEach(function () {
		if (!API_BASE)
			this.skip()
	})

	describe('#addTermToVocabulary', function () {
		const vocab = VOCAB_ONE
		const testTerm = 'test-term'
		const store = mockStore({})

		beforeEach(function () {
			fetchMock.mock(
				vocab.absolute_path,
				{status: 200, body: {status: 'ok'}},
				{method: 'PATCH'}
			)
		})

		afterEach(function () {
			fetchMock.restore()
			store.clearActions()
		})

		const boundAction = actions.addTermToVocabulary.bind(null, vocab, testTerm)

		it('dispatches `addingTermToVocabulary` and `addedTermToVocabulary`', function () {
			return store.dispatch(boundAction())
				.then(() => {
					const axns = store.getActions()
					expect(axns).to.have.length(2)
					expect(axns[0].type).to.equal(actions.addingTermToVocabulary.toString())
					expect(axns[1].type).to.equal(actions.addedTermToVocabulary.toString())
				})
		})

		describe('the `action.payload.data` object returned', function () {
			it('contains `label` created from the term string', function () {
				return store.dispatch(boundAction())
					.then(() => {
						const axns = store.getActions()
						const axn = axns[1]
						const data = axn.payload.term

						expect(data).to.have.property('label')
						expect(data.label).to.be.an.array
						expect(data.label).to.have.length(1)
						expect(data.label[0]).to.equal(testTerm)
					})
			})

			it('sets `pref_label` to the same value as `label`', function () {
				return store.dispatch(boundAction())
					.then(() => {
						const axns = store.getActions()
						const axn = axns[1]
						const data = axn.payload.term

						expect(data).to.have.property('pref_label')
						expect(data.pref_label).to.be.an('array')
						expect(data.pref_label).to.have.length(1)
						expect(data.pref_label).to.deep.equal(data.label)
					})
			})
		})
	})

	describe('#bulkEditTermsInVocabulary', function () {
		const vocab = VOCAB_ONE
		const activeTerms = [].concat(vocab.terms)
		const state = {activeVocabularyTerms: { data: activeTerms }}
		const store = mockStore(state)
		const prevTerms = activeTerms.map(t => t.pref_label[0])
		const newTerms = [
			'Picrodon',
			'Mononychus',
			'Bothriospondylus',
			'Velociraptor',
			'Eolosaurus',
			'Compsosuchus',
		]

		beforeEach(function () {
			fetchMock.put(vocab.absolute_path, {status: 200, body: {status: 'ok'}})
		})

		afterEach(function () {
			fetchMock.restore()
			store.clearActions()
		})

		const boundAction = actions.bulkEditTermsInVocabulary.bind(null, vocab)

		it('dispatches `bulkEditedTerms`', function () {
			return store.dispatch(boundAction(prevTerms))
			.then(() => {
				const axns = store.getActions()

				expect(axns).to.have.length(2)

				const axn = axns[1]
				expect(axn.type).to.equal(actions.bulkEditedTerms.toString())
			})
		})

		it('retains terms previously found in state', function () {
			return store.dispatch(boundAction(prevTerms))
			.then(() => {
				const terms = store.getActions()[1].payload.terms
				expect(terms).to.deep.equal(activeTerms)
			})
		})

		it('converts terms array of strings into term objects', function () {
			const isString = t => t && typeof t === 'string'
			expect(newTerms.every(isString)).to.be.true

			return store.dispatch(boundAction(newTerms))
				.then(() => store.getActions()[1].payload.terms.forEach(expectTerm))
		})
	})

	describe('#fetchTermsFromVocabulary', function () {
		const vocab = VOCAB_ONE
		const store = mockStore({})
		const boundAction = actions.fetchTermsFromVocabulary.bind(null, vocab)

		beforeEach(function () {
			fetchMock.get(vocab.absolute_path, {status: 200, body: vocab})
			fetchMock.get('*', 404)
		})

		afterEach(function () {
			fetchMock.restore()
			store.clearActions()
		})

		it('dispatches `fetchingVocabularyTerms` and `fetchedVocabularyTerms`', function () {
			return store.dispatch(boundAction())
			.then(() => {
				const axns = store.getActions()
				expect(axns).to.have.length(2)
				expect(axns[0].type)
					.to.equal(actions.fetchingVocabularyTerms.toString())
				expect(axns[1].type)
					.to.equal(actions.fetchedVocabularyTerms.toString())
			})
		})

		it('dispatches `fetchingVocabularyTermsErr` when 404\'d', function () {
			const nope = {
				absolute_path: `${API_BASE}/vocabularies/nope.json`,
			}

			return store.dispatch(actions.fetchTermsFromVocabulary(nope))
			.then(() => {
				const axns = store.getActions()
				expect(axns).to.have.length(2)
				expect(axns[0].type).to.equal(actions.fetchingVocabularyTerms.toString())
				expect(axns[1].type).to.equal(actions.fetchingVocabularyTermsErr.toString())
			})
		})

		it('dispatches the terms extracted from vocabulary response', function () {
			return store.dispatch(boundAction())
			.then(() => {
				const terms = store.getActions()[1].payload.terms
				expect(terms).to.be.an('array')
				terms.forEach(expectTerm)
			})
		})
	})

	describe('#removeTermFromVocabulary', function () {
		const vocab = VOCAB_ONE
		const terms = [].concat(vocab.terms)

		const removeRandomTerm = () => {
			const index = randomIndex(terms)
			const term = terms[index].pref_label[0]

			return actions.removeTermFromVocabulary(vocab, term, index)
		}

		const state = {
			activeVocabularyTerms: {
				data: terms,
			}
		}

		const store = mockStore(state)

		beforeEach(function () {
			fetchMock.put(vocab.absolute_path, {status: 200, body: {status: 'ok'}})
		})

		afterEach(function () {
			fetchMock.restore()
			store.clearActions()
		})

		it('dispatches `removingTermFromVocabulary` + `removedTermFromVocabulary`', function () {
			return store.dispatch(removeRandomTerm())
			.then(() => {
				const axns = store.getActions()
				expect(axns).to.have.length(2)
				expect(axns[0].type).to.equal(actions.removingTermFromVocabulary.toString())
				expect(axns[1].type).to.equal(actions.removedTermFromVocabulary.toString())
			})
		})

		it('sends index, term, and vocabulary data with each action', function () {
			return store.dispatch(removeRandomTerm())
			.then(() => {
				const axns = store.getActions()
				expect(axns).to.have.length(2)

				axns.forEach(a => {
					const { payload } = a
					expect(payload).to.have.property('index')
					expect(payload).to.have.property('term')
					expect(payload.term).to.not.be.empty
					expect(payload).to.have.property('vocabulary')
					expect(payload.vocabulary).to.not.be.empty
				})
			})
		})

		it('slices the term out of the array', function () {
			return store.dispatch(removeRandomTerm())
			.then(() => {
				let body = fetchMock.lastOptions().body

				if (typeof body === 'string') {
					body = JSON.parse(body)
				}

				const stateTerms = store.getState().activeVocabularyTerms.data
				const sentTerms = body.vocabulary.terms

				expect(stateTerms.length).to.be.greaterThan(sentTerms.length)
				expect(stateTerms.length - sentTerms.length).to.equal(1)

				const term = store.getActions()[0].term

				expect(sentTerms.some(t => t.pref_label.indexOf(term) > -1)).to.be.false
			})
		})
	})

	describe('#updateTermInVocabulary', function () {
		const vocab = VOCAB_ONE
		const terms = [].concat(vocab.terms)
		const store = mockStore({})

		const getRandomTerm = () => {
			const index = randomIndex(terms)
			return { ...terms[index] }
		}

		const updateRandomTerm = () => {
			const term = getRandomTerm()

			// see https://github.com/dariusk/corpora/blob/master/data/games/wrestling_moves.json
			const pool = [
				'Double inverted DDT', 'Elevated jawbreaker', 'Elevated splash',
				'Enzuigiri', 'European uppercut', 'Eye poke', 'Go 2 Sleep',
			]

			const update = pool[randomIndex(pool)]
			term.alt_label.push(update)

			return term
		}

		beforeEach(function () {
			fetchMock.mock(
				vocab.absolute_path,
				{status: 200, body: {status: 'ok'}},
				{method: 'PATCH'}
			)
			fetchMock.mock('*', 404, {method: 'PATCH'})
		})

		afterEach(function () {
			fetchMock.restore()
			store.clearActions()
		})

		it('dispatches `updatingTermInVocabulary` + `updatedTermInVocabulary`', function () {
			const term = updateRandomTerm()
			const termStr = term.pref_label[0]
			return store.dispatch(actions.updateTermInVocabulary(vocab, termStr, term))
			.then(() => {
				const axns = store.getActions()
				expect(axns).to.have.length(2)
				expect(axns[0].type).to.equal(actions.updatingTermInVocabulary.toString())
				expect(axns[1].type).to.equal(actions.updatedTermInVocabulary.toString())
			})
		})

		it('dispatches `updatingTermInVocabularyErr` when 404\'d', function () {
			const nope = {
				absolute_path: 'http://nope.org'
			}

			const term = updateRandomTerm()
			const termStr = term.pref_label[0]

			return store.dispatch(actions.updateTermInVocabulary(nope, termStr, term))
			.then(() => {
				const axns = store.getActions()
				expect(axns).to.have.length(2)
				expect(axns[0].type).to.equal(actions.updatingTermInVocabulary.toString())
				expect(axns[1].type).to.equal(actions.updatingTermInVocabularyErr.toString())
				expect(axns[1].error).to.be.true
			})
		})

		it('sends the previous pref_label with action', function () {
			const term = getRandomTerm()
			const termStr = term.pref_label[0]

			term.pref_label = ['=^_^= ~~~ new Pref Label']

			return store.dispatch(actions.updateTermInVocabulary(vocab, termStr, term))
			.then(() => {
				const axns = store.getActions()
				expect(axns).to.have.length(2)

				const update = axns[1].payload
				expect(update.previousPrefLabel).to.not.equal(update.data.pref_label[0])
				expect(update.previousPrefLabel).to.equal(termStr)
			})
		})
	})
})




