const {client} = require('nightwatch-cucumber')
const {defineSupportCode} = require('cucumber')

defineSupportCode(({Given, Then, When}) => {
	Given('the Work has a title {arg1:stringInDoubleQuotes}', (arg1) => {

	})


	Then('the user searches using the keyword {arg1:stringInDoubleQuotes}', (arg1) => {
		const results = client.page.resultsPage()

		results.assert.visible('@searchInput')

		results.setValue('@searchInput', arg1)
		client.saveScreenshot('./test/e2e/reports/search_by_specific_phrase_01.png')
		return client
			.keys(client.Keys.ENTER)
	})

	Then('the user should find at least {arg1:stringInDoubleQuotes} result', (arg1) => {
		const results = client.page.resultsPage()
		results.assert.visible('@resultsRow')
	})

	Then('the Work titled {arg1:stringInDoubleQuotes} should be a result', (arg1) => {
		const results = client.page.resultsPage()
		results.assert.containsText('@resultsRow', arg1)
	})
})
