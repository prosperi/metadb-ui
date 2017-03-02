Feature: User adds Terms to Controlled Vocabularies

Scenario: Work is a digitized photo
  Given the Work has been ingested
  And the Work has is classified by the subject heading "Lafayette, Marie Joseph Paul Yves Roch Gilbert Du Motier, marquis de, 1757-1834 -- Portraits"
  When the user browses to the Work Page
  And the user should be able to update the subject using another Library of Congress subject heading
  And the user should be able to update the subject using a term from a local controlled vocabulary
  And the user should be able to update the subject using a term which does not exist in any local controlled vocabulary

Scenario: Controlled Vocabulary contains terms for local placenames
  Given the controlled Vocabulary has been created
  And the controlled Vocabulary contains at least 1 term
  When the user browses to the Vocabulary Management Page
  And the user selects a new Vocabulary
  Then the user should be able to add a new placename
  And the user should be able to specify a placename URI
  And the user should be able to specify a placename label
  And the user should be able to specify multiple alternative placename labels
  And the user should be able to specify a preferred placename label
  And the user should be able to specify a placename label for tooltips, screen readers, and term metadata
