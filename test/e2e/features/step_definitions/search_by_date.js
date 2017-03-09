const {client} = require('nightwatch-cucumber')
const {defineSupportCode} = require('cucumber')

defineSupportCode(({Given, Then, When}) => {
	Given('the Work has been ingested',  () => {

	})

	When('the user browses to the search Page',  (callback) => {
		return client
      .url('http://localhost:8080/search?q=')
      .waitForElementVisible('body', 1000)
	})

	When('the user searches using the submission year {arg1:stringInDoubleQuotes}',  (arg1, callback) => {
	  // Write code here that turns the phrase above into concrete actions
	  callback(null, 'pending')
	})

	Then('the user should find at least {arg1:stringInDoubleQuotes} result',  (arg1, callback) => {
	  // Write code here that turns the phrase above into concrete actions
	  callback(null, 'pending')
	})

	Then('the Work with a submission date {arg1:stringInDoubleQuotes} should be a result',  (arg1, callback) => {
	  // Write code here that turns the phrase above into concrete actions
	  callback(null, 'pending')
	})
})
