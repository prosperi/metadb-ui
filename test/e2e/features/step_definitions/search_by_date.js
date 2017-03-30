const {client} = require('nightwatch-cucumber')
const {defineSupportCode} = require('cucumber')

defineSupportCode(({Given, Then, When}) => {
	Given('the Work has a submission date {arg1:int}{arg2:int}{arg3:int}', (arg1, arg2, arg3) => {

	})

	When('the user browses to the search Page',  () => {
		return client
      .url('http://localhost:8080/search?q=')
      .waitForElementVisible('body', 5000)
	})

	When('the user searches using the submission year {arg1:int}', (arg1) => {
	  const results = client.page.resultsPage()

		results
			.waitForElementVisible('@dateOriginal', 3000)
		  .click('@dateOriginalHeader')
			.waitForElementVisible('@dateOriginalInput', 3000)
			.setValue('@dateOriginalInput', '01/01/' + arg1)

		client.saveScreenshot('./test/e2e/reports/search_by_date_01.png')

		return results.click('@dateOriginalButton')

	})

	Then('the user should find at least {arg1:int} result', (arg1) => {
		const results = client.page.resultsPage()
		return results
			.waitForElementVisible('@resultsRow', 3000)
			.click('@resultsFirstChild')
			.waitForElementVisible('body', 5000)
	})

	Then('the Work with a submission date {arg1:int}{arg2:int}{arg3:int} should be a result', (arg1, arg2, arg3) => {

	})
})
