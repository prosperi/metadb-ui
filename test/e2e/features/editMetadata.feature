Feature: User edits Works
	Scenario: Work is a digitized photo
	  Given the Work has been ingested
	  And the Work has a title "DE MARQUIS DE LA FAYETTE"
	  And the Work has a date 1757-01-01
	  And the Work has is classified by the subject heading "Lafayette, Marie Joseph Paul Yves Roch Gilbert Du Motier, marquis de, 1757-1834 -- Portraits"
	  When the user browses to the Work Page
	  Then the user should be able update the title to "MARQUIS DE LA FAYETTE"
	  And the user should be able to update the date to 1758-02-03
	  And the user should be able to update the subject using only another Library of Congress subject heading
