@openBrowser @closeBrowser
Feature: project
  As a user I want to be able to create, filter and search projects in Jira.

  Background:
    Given I loggin in Atlassian and go to Jira dashboard

  @03 @ui @deleteProject
  Scenario: Verify that user can create a project from the IT Service template
    When I click on create project button
    And I create a project with the following values:
      | templateType | IT                                 |
      | template     | IT service management              |
      | name         | default-project-automation-test-03 |
      | key          | PAT03                              |
      | teamType     | Information technology (IT)        |
    Then I verify that project was created with the values:
      | name     | default-project-automation-test-03 |
      | key      | PAT03                              |
      | teamType | Information technology (IT)        |

  @04 @ui
  Scenario: Verify that user can't create a project with a name exceeding the character limit
    When I click on create project button
    And I fill new project values with the following values:
      | templateType | IT                                                                                     |
      | template     | IT service management                                                                  |
      | name         | project-automation-test-04-verify-long-name-limit-exceeds-81-characters-for-validation |
      | key          | PAT04                                                                                  |
      | teamType     | Information technology (IT)                                                            |
    Then I verify that page displays error message

  @05 @ui @createProject @deleteProject
  Scenario: Verify that user can search a project by name
    When I clean the filter by product field
    And I search by name the project created by API
    Then I verify that the project created by API is on the list

  @06 @ui @createProject @deleteProject
  Scenario: Verify that user can filter a project by type
    When I clean the filter by product field
    And I filter by type the project created by API
    Then I verify that the project created by API is on the list
