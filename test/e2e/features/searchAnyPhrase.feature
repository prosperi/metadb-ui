#Feature: User searches for Works
#	Scenario: Work has an abstract
#	  Given the Work has been ingested
#	  And the Work has an abstract "spanner graphs construction"
#	  When the user browses to the search Page
#	  And the user searches using the keyword "spanner graphs construction"
#	  Then the user should find at least 1 result
#	  And the Work with the abstract "spanner graphs construction" should be a result
