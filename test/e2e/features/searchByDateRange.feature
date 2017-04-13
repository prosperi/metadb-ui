# Feature: User searches for Works
# 	Scenario: Work has a lower artifact date of 1933 and an upper artifact date of 1945
# 	  Given the Work has been ingested
# 	  And the Work has a lower artifact date of 1933 and an upper artifact date of 1945
# 	  When the user browses to the search Page
# 	  And the user facets upon the upper artifact date range for 1933 - 1945
# 	  Then the user should find at least 1 result
# 	  And the Work with a lower artifact date of 1933 and an upper artifact date of 1945 should be a result
