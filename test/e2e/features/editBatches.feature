#Feature: User edits a Batch of Works
#	Scenario: Batch is a set of Works for digitized photos with the same metadata schema
#	  Given that each Work in the batch has been ingested
#	  And each Work has a title
#	  And each Work has a date
#	  And each Work has is classified by a subject heading
#	  When the user browses to the Search Page
#	  Then the user should be able select all Works in the Batch
#	  And the user should be able to update the title for all Works in the Batch
#	  And the user should be able to update the date for all Works in the Batch
#	  And the user should be able to update the subject for all Works in the Batch using only a subject heading from a controlled vocabulary
#	Scenario: Batch is a set of Works for digitized photos and scanned documents with different metadata schemas
#	  Given that each Work in the batch has been ingested
#	  And some Works have a title
#	  And some Works have a date
#	  And some Works have been classified by a subject heading
#	  When the user browses to the Search Page
#	  Then the user should be able select all Works in the Batch
#	  And the user should be able to update the title for all Works in the Batch with a title
#	  And the user should be able to update the date for all Works in the Batch with a date
#	  And the user should be able to update the subject for all Works in the Batch with a subject using only a subject heading from a controlled vocabulary
#	  When the user submits the update
#	  Then the user should be notified of any Works for which the title, date, and subject could not be updated
