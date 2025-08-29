Feature: authentication
  As a user I want to be able to login in atlassian and use Jira.

  @01 @ui @openBrowser @closeBrowser
  Scenario: Verify that user can successfully login to Atlassian and access Jira Dashboard
    Given I navigate to Atlassian login page
    When I introduce the user values to login:
      | email    | JIRA_EMAIL    |
      | password | JIRA_PASSWORD |
    And I click on submit login button
    And I click on Jira dashboard button
    Then I verify that page shows Jira title
    And I verify that user "JIRA_USERNAME" is logged

  @02 @ui @openBrowser @closeBrowser
  Scenario: Verify that user receives error when login with incorrect password
    Given I navigate to Atlassian login page
    When I introduce the user values to login:
      | email    | JIRA_EMAIL       |
      | password | invalid_password |
    And I click on submit login button
    Then I verify that page shows login error
