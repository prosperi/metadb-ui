const {client} = require('nightwatch-cucumber')
const {defineSupportCode} = require('cucumber')

defineSupportCode(({Given, Then, When}) => {
	Given('the Work has been ingested', () => {

	})

	Given('the Work has a title {arg1:stringInDoubleQuotes}', (arg1) =>{

  })

	Given('the Work has a date {arg1:stringInDoubleQuotes}', (arg1) => {

	})

	Given('the Work has is classified by the subject heading {arg1:stringInDoubleQuotes}', (arg1) => {

	})

	When('the user browses to the Work Page', () => {
		return client
			.url('http://localhost:8080/works/h415p952n')
			.waitForElementVisible('body', 3000)
	})

	Then('the user should be able to update the title to {arg1:stringInDoubleQuotes}', (arg1) => {
		const results = client.page.resultsPage()
		results
			.waitForElementVisible('@titleInput', 3000)
			.clearValue('@titleInput')
			.setValue('@titleInput', arg1)

		client.saveScreenshot('./test/e2e/reports/edit_metadata_01.png')
	})

	Then('the user should be able to update the date to {arg1:stringInDoubleQuotes}', (arg1) => {
		const results = client.page.resultsPage()
		results
			.waitForElementVisible('@dateInput', 3000)
			.clearValue('@dateInput')
			.setValue('@dateInput', arg1)

		client.saveScreenshot('./test/e2e/reports/edit_metadata_02.png')
	})

	Then('the user should be able to update the subject using only another Library of Congress subject heading', () => {

	})
})
