Feature: User searches for Works

Scenario: Work has a title

		Given the Work has been ingested
	  And the Work has a title "DE MARQUIS DE LA FAYETTE"
	  When the user browses to the search Page
	  And the user searches using the keyword "DE MARQUIS DE LA FAYETTE"
	  Then the user should find at least "1" result
	  And the Work titled "DE MARQUIS DE LA FAYETTE" should be a result
