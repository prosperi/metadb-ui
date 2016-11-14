import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import VocabularyList from '../src/components/vocabulary/VocabularyList.jsx'

const vocabularies = [{"uri":"http://authority.lafayette.edu/ns/testVocab","label":["testVocab"],"alt_label":["testVocab"],"pref_label":["testVocab"],"hidden_label":["testVocab"],"absolute_path":"//concerns.stage.lafayette.edu/vocabularies/testVocab.json","term_count":5},{"uri":"http://authority.lafayette.edu/ns/testVocab2","label":["testVocab2"],"alt_label":["testVocab2"],"pref_label":["testVocab2"],"hidden_label":["testVocab2"],"absolute_path":"//concerns.stage.lafayette.edu/vocabularies/testVocab2.json","term_count":0},{"uri":"http://authority.lafayette.edu/ns/testVocab3","label":["testVocab3"],"alt_label":["testVocab3"],"pref_label":["testVocab3"],"hidden_label":["testVocab3"],"absolute_path":"//concerns.stage.lafayette.edu/vocabularies/testVocab3.json","term_count":0},{"uri":"http://authority.lafayette.edu/ns/testVocabRest1.json","label":["testVocabRest1"],"alt_label":["testVocabRest1"],"pref_label":["testVocabRest1"],"hidden_label":["testVocabRest1"],"absolute_path":"//concerns.stage.lafayette.edu/vocabularies/testVocabRest1.json.json","term_count":0},{"uri":"http://localhost/ns/testVocab","label":["testVocabDuplicate"],"alt_label":["testVocabDuplicate"],"pref_label":["testVocabDuplicate"],"hidden_label":["testVocabDuplicate"],"absolute_path":"//concerns.stage.lafayette.edu/vocabularies/testVocab.json","term_count":1}]


const stockOpts = {
	onAddVocabulary: action('add vocabulary'),
	onVocabularyClick: action('vocab click'),
}


storiesOf('VocabularyList', module)
	.add('no vocabularies provided', () => (
		<VocabularyList {...stockOpts} />
	))
	.add('vocabularies provided', () => (
		<VocabularyList {...stockOpts} vocabularies={vocabularies} />
	))
