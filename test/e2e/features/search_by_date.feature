Feature: User searches for Works

Scenario Outline: Work has a submission date

	Given the Work has been ingested
	And the Work has a submission date <date>
	When the user browses to the search Page
	And the user searches using the submission year <year>
	Then the user should find at least <num> result
	And the Work with a submission date <date> should be a result

	Examples:
    | date       | year  | num |
    | 2016-12-07 | 2016  | 1 |
