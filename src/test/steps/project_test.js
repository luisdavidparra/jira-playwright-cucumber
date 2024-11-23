const { When, Then } = require('@cucumber/cucumber');
const ProjectPage = require('../../../jira/page_object/project_page');
const Actions = require('../../../core/ui/actions');
const Assertions = require('../../../core/ui/assertions');
const dotenv = require('dotenv');
const logger = require('../../../core/utils/logger');
const TopBarPage = require('../../../jira/page_object/top_bar_page');
const CreateIssueModalPage = require('../../../jira/page_object/create_issue_modal_page');

dotenv.config();

When('I click on create project button', async () => {
  logger.step('Clicking create project button');
  await Actions.clickByTestId(ProjectPage.createProjectsBtn, 'create project');
});

When('I create a project with the following values:', async (userValues) => {
  logger.step('Filling new project values');
  let values = { templateType: '', template: '', name: '', key: '', teamType: '' };
  this.userValues = userValues.rowsHash();

  Object.keys(this.userValues).forEach((key) => {
    values[key] = process.env[this.userValues[key]] || this.userValues[key];
  });

  await Actions.clickByRole(values.templateType, 'button', 'template  type', true);
  await Actions.clickByRole(values.template, 'button', 'template', true);
  await Actions.clickByTestId(ProjectPage.useTemplateBtn, 'project template');
  await Actions.fillByTestId(ProjectPage.projectFormNameTxt, values.name, 'project name input');
  await Actions.fillByTestId(ProjectPage.projectFormKeyTxt, values.key, 'projcet key input');
  await Actions.click(ProjectPage.projectTeamTypeCbo, 'project team type');
  await Actions.clickByRole(values.teamType, 'option', 'team type');
  await Actions.click(ProjectPage.submitCreateProjectBtn, 'submit create project');
  await Actions.waitForElementToHide(ProjectPage.submitCreateProjectBtn, 'submit create project');
  await Actions.reloadPage();
});
When('I fill new project values with the following values:', async (userValues) => {
  logger.step('Filling new project values');
  let values = { templateType: '', template: '', name: '', key: '', teamType: '' };
  this.userValues = userValues.rowsHash();

  Object.keys(this.userValues).forEach((key) => {
    values[key] = process.env[this.userValues[key]] || this.userValues[key];
  });

  await Actions.clickByRole(values.templateType, 'button', 'template  type', true);
  await Actions.clickByRole(values.template, 'button', 'template', true);
  await Actions.clickByTestId(ProjectPage.useTemplateBtn, 'project template');
  await Actions.fillByTestId(ProjectPage.projectFormKeyTxt, values.key, 'projcet key input');
  await Actions.click(ProjectPage.projectTeamTypeCbo, 'project team type');
  await Actions.clickByRole(values.teamType, 'option', 'team type');
  await Actions.fillByTestId(ProjectPage.projectFormNameTxt, values.name, 'project name input');
  await Actions.click(ProjectPage.submitCreateProjectBtn, 'submit create project');
});

Then('I verify that project was created with the values:', async (expectedValues) => {
  logger.step('Verifying project was created with correct values');
  let values = { name: '', key: '', teamType: '' };
  this.expectedValues = expectedValues.rowsHash();

  Object.keys(this.userValues).forEach((key) => {
    values[key] = process.env[this.userValues[key]] || this.userValues[key];
  });

  await Actions.click(ProjectPage.projectSettingsDetailsBtn, 'project settings details');
  await Assertions.expectToHaveAttribute(ProjectPage.projectSettingsNameTxt, 'value', values.name);
  await Assertions.expectToHaveAttribute(ProjectPage.projectSettingsKeyTxt, 'value', values.key);
  await Assertions.expectToContainText(ProjectPage.projectSettingsTypeLbl, values.teamType);
});

Then('I verify that page displays error message', async () => {
  logger.step('Verifying page displays error message');
  await Assertions.expectToBeVisible(ProjectPage.projectCreationErrorDescriptionLbl);
});

When('I clean the filter by product field', async () => {
  await Actions.clickByLabel('clear', 'Filter by product field', true);
});

When('I search by name the project created by API', async () => {
  await Actions.fillByTestId(
    ProjectPage.searchFiledTxt,
    'default-project-automation-test',
    'Search Field'
  );
});

Then('I verify that the project created by API is on the list', async () => {
  await Assertions.expectToBeVisibleByRole('default-project-automation-test', 'link');
  await Assertions.expectToContainText('tbody', 'DPR');
});

When('I filter by type the project created by API', async () => {
  await Actions.click(ProjectPage.filterByProductBtn, 'Filter by product field');
  await Actions.clickByRole('Jira Service Management', 'option', 'Jira Service Managment option');
});

When('I create a new issue with the name {string}', async (issueName) => {
  await Actions.clickByTestId(TopBarPage.createBtn, 'create button');
  await Actions.fillByTestId(CreateIssueModalPage.issueSummaryTxt, issueName, 'issue name input');
  await Actions.clickByTestId(CreateIssueModalPage.createIssueBtn, 'submit create issue');
});

When('I open the board of the project', async () => {
  await Actions.clickByRole('Board', 'link', 'project board');
});

Then('I verify that {string} issue is in TO DO section', async (issueName) => {
  await Assertions.expectToBeVisibleHasText(ProjectPage.todoBoardSectionTbl, issueName);
});
