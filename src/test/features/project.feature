Feature: project
  As a user I want to be able to create, filter and search projects in Jira.

  Background:
    Given I login in Atlassian and go to Jira dashboard

  @03 @ui @openBrowser @closeBrowser @deleteProject
  Scenario: Verify that user can create a project from the IT Service template
    When I click on create project button
    And I create a project with the following values:
      | templateType | IT                          |
      | template     | IT service management       |
      | name         | project-automation-test-03  |
      | key          | PAT03                       |
      | teamType     | Information technology (IT) |
    Then I verify that project was created with the values:
      | name     | project-automation-test-03  |
      | key      | PAT03                       |
      | teamType | Information technology (IT) |
