const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../../../jira/page_object/login_page');
const { jiraDashboardBtn } = require('../../../jira/page_object/atlassian_home_page');
const TopBarPage = require('../../../jira/page_object/top_bar_page');
const Actions = require('../../../core/actions');
const { expectToBeVisible } = require('../../../core/assertions');
const dotenv = require('dotenv');
dotenv.config();

Given('I navigate to Atlassian login page', async () => {
  await Actions.goto('https://id.atlassian.com/login');
});

When('I introduce the user values to login:', async (userValues) => {
  let values = { email: '', password: '' };
  this.userValues = userValues.rowsHash();

  Object.keys(this.userValues).forEach((key) => {
    values[key] = process.env[this.userValues[key]] || this.userValues[key];
  });

  await Actions.fillByTestId(LoginPage.usernameTxt, values.email);
  await Actions.click(LoginPage.loginSubmitBtn);
  await Actions.fillByTestId(LoginPage.passwordTxt, values.password);
});

When('I click on submit login button', async () => {
  await Actions.click(LoginPage.loginSubmitBtn);
});

When('I click on Jira dashboard button', async () => {
  const email = process.env.JIRA_EMAIL;
  await Actions.clickByRole(jiraDashboardBtn(email), 'link');
});

Then('I verify that page shows Jira title', async () => {
  await expectToBeVisible(TopBarPage.jiraLogoLnk);
});

Then('I verify that user {string} is logged', async (user) => {
  const userName = process.env[user];
  await Actions.click(TopBarPage.profileIconBtn);
  await expectToBeVisible(TopBarPage.profileUserNameLbl(userName));
});
