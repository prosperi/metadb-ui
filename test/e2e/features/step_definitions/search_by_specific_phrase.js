const {client} = require('nightwatch-cucumber')
const {defineSupportCode} = require('cucumber')

defineSupportCode(({Given, Then, When}) => {


	Then('the user searches using the keyword {arg1:stringInDoubleQuotes}', (arg1) => {
		const results = client.page.resultsPage()

		results
			.waitForElementVisible('@searchInput', 3000)
			.setValue('@searchInput', arg1)

		client.saveScreenshot('./test/e2e/reports/search_by_specific_phrase_01.png')
		return client
			.keys(client.Keys.ENTER)
	})

	Then('the user should find at least {arg1:stringInDoubleQuotes} result', (arg1) => {
		const results = client.page.resultsPage()
		results
			.waitForElementVisible('@resultsRow', 3000)
	})

	Then('the Work titled {arg1:stringInDoubleQuotes} should be a result', (arg1) => {
		const results = client.page.resultsPage()
		results.assert.containsText('@resultsRow', arg1)
	})
})
