Feature: Playwright test

  Scenario: Verify that playwright Installation page shows title
    Given I go to playwright page
    When I click on get started button
    Then I verify that page shows "Installation" title
