const { When, Then } = require('@cucumber/cucumber');
const ProjectPage = require('../../../jira/page_object/project_page');
const Actions = require('../../../core/ui/actions');
const { expectToHaveAttribute, expectToContainText } = require('../../../core/ui/assertions');
const dotenv = require('dotenv');
dotenv.config();

When('I click on create project button', async () => {
  await Actions.clickByTestId(ProjectPage.createProjectsBtn);
});

When('I create a project with the following values:', async (userValues) => {
  let values = { templateType: '', template: '', name: '', key: '', teamType: '' };
  this.userValues = userValues.rowsHash();

  Object.keys(this.userValues).forEach((key) => {
    values[key] = process.env[this.userValues[key]] || this.userValues[key];
  });

  await Actions.clickByRole(values.templateType, 'button', true);
  await Actions.clickByRole(values.template, 'button', true);
  await Actions.clickByTestId(ProjectPage.useTemplateBtn);
  await Actions.fillByTestId(ProjectPage.projectFormNameTxt, values.name);
  await Actions.fillByTestId(ProjectPage.projectFormKeyTxt, values.key);
  await Actions.click(ProjectPage.projectTeamTypeCbo);
  await Actions.clickByRole(values.teamType, 'option');
  await Actions.click(ProjectPage.submitCreateProjectBtn);
  await Actions.waitForElementToHide(ProjectPage.submitCreateProjectBtn);
  await Actions.reloadPage();
});

Then('I verify that project was created with the values:', async (expectedValues) => {
  let values = { name: '', key: '', teamType: '' };
  this.expectedValues = expectedValues.rowsHash();

  Object.keys(this.userValues).forEach((key) => {
    values[key] = process.env[this.userValues[key]] || this.userValues[key];
  });

  await Actions.click(ProjectPage.projectSettingsDetailsBtn);
  await expectToHaveAttribute(ProjectPage.projectSettingsNameTxt, 'value', values.name);
  await expectToHaveAttribute(ProjectPage.projectSettingsKeyTxt, 'value', values.key);
  await expectToContainText(ProjectPage.projectSettingsTypeLbl, values.teamType);
});
