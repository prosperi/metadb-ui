const API_BASE = process.env.API_BASE_URL
const AUTH_BASE = process.env.AUTH_BASE_URL

export default {
	uri: `${AUTH_BASE}/testVocabulary`,
	label: ['Test Vocabulary'],
	pref_label: ['Test Vocabulary'],
	alt_label: ['Test Description'],
	hidden_label: [],
	absolute_path: `${API_BASE}/vocabularies/testVocabulary.json`,
	terms: [
		{
			uri: `${AUTH_BASE}/testVocabulary/firstTerm`,
			label: ['First Term'],
			pref_label: ['First Term'],
			alt_label: [],
			hidden_label: [],
			absolute_path: `${API_BASE}/vocabularies/testVocabulary/firstTerm.json`
		},
		{
			uri: `${AUTH_BASE}/testVocabulary/secondTerm`,
			label: ['Second Term'],
			pref_label: ['Second Term'],
			alt_label: [],
			hidden_label: [],
			absolute_path: `${API_BASE}/vocabularies/testVocabulary/secondTerm.json`
		},
		{
			uri: `${AUTH_BASE}/testVocabulary/thirdTerm`,
			label: ['Third Term'],
			pref_label: ['Third Term'],
			alt_label: [],
			hidden_label: [],
			absolute_path: `${API_BASE}/vocabularies/testVocabulary/thirdTerm.json`
		},
		{
			uri: `${AUTH_BASE}/testVocabulary/fourthTerm`,
			label: ['4th Term'],
			pref_label: ['Fourth Term'],
			alt_label: ['Fourth Term'],
			hidden_label: [],
			absolute_path: `${API_BASE}/vocabularies/testVocabulary/fourthTerm.json`
		},
		{
			uri: `${AUTH_BASE}/testVocabulary/fifthTerm`,
			label: ['Fifth Term'],
			pref_label: ['Fifth Term'],
			alt_label: [],
			hidden_label: [],
			absolute_path: `${API_BASE}/vocabularies/testVocabulary/fifthTerm.json`
		}
	]
}
