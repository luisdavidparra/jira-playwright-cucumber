const { When, Then } = require('@cucumber/cucumber');
const ProjectPage = require('../../../jira/page_object/project_page');
const Actions = require('../../../core/ui/actions');
const { expectToHaveAttribute, expectToContainText } = require('../../../core/ui/assertions');
const dotenv = require('dotenv');
const logger = require('../../../core/utils/logger');
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

Then('I verify that project was created with the values:', async (expectedValues) => {
  logger.step('Verifying project was created with correct values');
  let values = { name: '', key: '', teamType: '' };
  this.expectedValues = expectedValues.rowsHash();

  Object.keys(this.userValues).forEach((key) => {
    values[key] = process.env[this.userValues[key]] || this.userValues[key];
  });

  await Actions.click(ProjectPage.projectSettingsDetailsBtn, 'project settings details');
  await expectToHaveAttribute(ProjectPage.projectSettingsNameTxt, 'value', values.name);
  await expectToHaveAttribute(ProjectPage.projectSettingsKeyTxt, 'value', values.key);
  await expectToContainText(ProjectPage.projectSettingsTypeLbl, values.teamType);
});
