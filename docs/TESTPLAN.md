# Test Plan: Jira with Playwright and Cucumber

## Overview and Objectives

- The main objective of this test plan is to create a strategy and approach to UI and API automated tests for Jira web application.
- Verify the functionality of the basic Jira features to ensure the quality of the product.

## Scope

- Authentication: login and logout.
- Organizations: create, edit and delete.
- Boards: create and delete.

## Acceptance Criteria

- All automated tests should run successfully on Chrome and Firefox browsers.

## UI Scenarios

- Verify that user can successfully login to Atlassian and access Jira Dashboard.
- Verify that user receives error when login with incorrect password.
- Verify that user can create a project from the IT Service template.
- Verify that user can't create a project with a name exceeding the character limit.
- Verify that user can search a project by name.
- Verify that user can filter a project by type.
- Verify that when user creates an issue, it is added to TO DO section in boards.
- Verify that user can create an issue with an attached file.
- Verify that user can add an internal note to an issue.
- Verify that user can change an issue between states in a project board.

## API Scenarios

- Verify that user can create a new project with required values.
- Verify that user can delete permanently a project.
- Verify that user cannot delete a project that does not exist.
- Verify that user can update the name of an existing project.
- Verify that user can not create an project with 0 characters in the name.

## Testing Types

- Functional Testing.
- Regression Testing.
- Negative Testing.
- UI Testing.
- API Testing.

## Testing tools

- Playwright: for UI automated tests.
- Cucumber: for writing and executing BDD tests.
- Axios: for API calls.
