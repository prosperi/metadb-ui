const API_BASE = process.env.API_BASE_URL
const AUTH_BASE = process.env.AUTH_BASE_URL

export default {
	uri: `${AUTH_BASE}/anotherTestVocabulary`,
	label: ['Another Test Vocabulary'],
	pref_label: ['Another Test Vocabulary'],
	alt_label: ['Another Test Description'],
	hidden_label: [],
	absolute_path: `${API_BASE}/vocabularies/anotherTestVocabulary.json`,
	terms: [
		{
			uri: `${AUTH_BASE}/anotherTestVocabulary/firstTerm`,
			label: ['First Term'],
			pref_label: ['First Term'],
			alt_label: [],
			hidden_label: [],
			absolute_path: `${API_BASE}/vocabularies/anotherTestVocabulary/firstTerm.json`
		},
		{
			uri: `${AUTH_BASE}/anotherTestVocabulary/secondTerm`,
			label: ['Second Term'],
			pref_label: ['Second Term'],
			alt_label: [],
			hidden_label: [],
			absolute_path: `${API_BASE}/vocabularies/anotherTestVocabulary/secondTerm.json`
		},
		{
			uri: `${AUTH_BASE}/anotherTestVocabulary/thirdTerm`,
			label: ['Third Term'],
			pref_label: ['Third Term'],
			alt_label: [],
			hidden_label: [],
			absolute_path: `${API_BASE}/vocabularies/anotherTestVocabulary/thirdTerm.json`
		},
		{
			uri: `${AUTH_BASE}/anotherTestVocabulary/fourthTerm`,
			label: ['4th Term'],
			pref_label: ['Fourth Term'],
			alt_label: ['Fourth Term'],
			hidden_label: [],
			absolute_path: `${API_BASE}/vocabularies/anotherTestVocabulary/fourthTerm.json`
		},
		{
			uri: `${AUTH_BASE}/anotherTestVocabulary/fifthTerm`,
			label: ['Fifth Term'],
			pref_label: ['Fifth Term'],
			alt_label: [],
			hidden_label: [],
			absolute_path: `${API_BASE}/vocabularies/anotherTestVocabulary/fifthTerm.json`
		}
	]
}
