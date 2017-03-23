require('babel-core/register')
const seleniumServer = require('selenium-server')
const chromedriver = require('chromedriver')

require('nightwatch-cucumber')({
	cucumberArgs: ['--require', './test/timeout.js', '--require', './test/e2e/features/step_definitions', '--format', 'pretty', '--format', 'json:./test/e2e/reports/cucumber.json', './test/e2e/features']
})

module.exports = {
	output_folder: './test/e2e/reports',
	page_objects_path: './test/e2e/pages',
	custom_assertions_path: '',
	live_output: false,
	disable_colors: false,
	selenium: {
		start_process: true,
		server_path: seleniumServer.path,
		log_path: './test/e2e/reports',
		host: '127.0.0.1',
		port: 4444,
		cli_args: {
      'webdriver.chrome.driver': './node_modules/selenium-standalone/.selenium/chromedriver/2.27-x64-chromedriver'
    }
	},
	test_settings: {
		default: {
			launch_url: 'http://localhost:9090',
			selenium_port: 4444,
			selenium_host: 'localhost',
			silent: true,
			desiredCapabilities: {
				browserName: 'chrome',
				javascriptEnabled: true,
				acceptSslCerts: true
			}
		}
	}
}
