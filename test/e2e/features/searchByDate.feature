Feature: User searches for Works
	Scenario: Work has a submission date
	  Given the Work has been ingested
	  And the Work has a submission date 2016-12-07
	  When the user browses to the search Page
	  And the user searches using the submission year 2016
	  Then the user should find at least 1 result
	  And the Work with a submission date 2016-12-07 should be a result
