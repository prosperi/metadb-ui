// const {client} = require('nightwatch-cucumber')
// const {defineSupportCode} = require('cucumber')
//
// defineSupportCode(({Given, Then, When}) => {
// 	Given('the Work has a lower artifact date of {arg1:int} and an upper artifact date of {arg2:int}', (arg1, arg2) => {
// 		const results = client.page.resultsPage()
//
// 		results
// 			.waitForElementVisible('@dateLower', 3000)
// 		  .click('@dateLowerHeader')
// 			.waitForElementVisible('@dateLowerInput', 3000)
// 			.setValue('@dateLowerInput', '01/01/' + arg1)
//
// 		client.saveScreenshot('./test/e2e/reports/search_by_date_range_01.png')
//
// 		results
// 			.waitForElementVisible('@dateUpper', 3000)
// 		  .click('@dateUpperHeader')
// 			.waitForElementVisible('@dateUpperInput', 3000)
// 			.setValue('@dateUpperInput', '01/01/' + arg2)
//
// 		client.saveScreenshot('./test/e2e/reports/search_by_date_range_02.png')
//
// 		return results.click('@dateOriginalButton')
// 	})
//
// 	When('the user facets upon the upper artifact date range for {arg1:int} - {arg2:int}', (arg1, arg2) => {
//
// 	})
//
// 	Then('the Work with a lower artifact date of {arg1:int} and an upper artifact date of {arg2:int} should be a result', (arg1, arg2) => {
//
//   })
// })
