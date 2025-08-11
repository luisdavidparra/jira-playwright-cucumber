const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../../../jira/page_object/login_page');
const { jiraDashboardBtn } = require('../../../jira/page_object/atlassian_home_page');
const TopBarPage = require('../../../jira/page_object/top_bar_page');
const Actions = require('../../../core/ui/actions');
const { expectToBeVisible } = require('../../../core/ui/assertions');
const dotenv = require('dotenv');
const logger = require('../../../core/utils/logger');
dotenv.config();

Given('I navigate to Atlassian login page', async () => {
  logger.step('Navigating to Atlassian login page');
  await Actions.goto(process.env.UI_BASE_URL);
});

When('I introduce the user values to login:', async (userValues) => {
  logger.step('Introducing user login values');
  let values = { email: '', password: '' };
  this.userValues = userValues.rowsHash();

  Object.keys(this.userValues).forEach((key) => {
    values[key] = process.env[this.userValues[key]] || this.userValues[key];
  });

  await Actions.fillByTestId(LoginPage.usernameTxt, values.email, 'username input');
  await Actions.click(LoginPage.loginSubmitBtn, 'submit login');
  await Actions.fillByTestId(LoginPage.passwordTxt, values.password, 'password input');
});

When('I click on submit login button', async () => {
  logger.step('Clicking submit login');
  await Actions.click(LoginPage.loginSubmitBtn, 'submit login');
  await Actions.waitForLoadState();
  await Actions.tryClick2FASkipButton(LoginPage.skip2FAPromoBtn);
});

When('I click on Jira dashboard button', async () => {
  logger.step('Clicking Jira dashboard');
  const email = process.env.JIRA_EMAIL;
  await Actions.clickByRoleAndHandleNewTab(jiraDashboardBtn(email), 'link', 'Jira dashboard');
});

Then('I verify that page shows Jira title', async () => {
  logger.step('Verifying that page shows Jira title');
  await expectToBeVisible(TopBarPage.jiraLogo);
});

Then('I verify that user {string} is logged', async (user) => {
  logger.step('Verifying that user is logged');
  const userName = process.env[user];
  await Actions.click(TopBarPage.profileIconBtn, 'profile icon ');
  await expectToBeVisible(TopBarPage.profileUserNameLbl(userName));
});

Then('I verify that page shows login error', async () => {
  logger.step('Verifying that page shows login error');
  await expectToBeVisible(LoginPage.loginErrorFrm);
});

Given('I loggin in Atlassian and go to Jira dashboard', async () => {
  logger.step('Logging in Atlassian and go to Jira dashboard');
  await Actions.goto(process.env.UI_BASE_URL);
  await Actions.fillByTestId(LoginPage.usernameTxt, process.env.JIRA_EMAIL, 'username input');
  await Actions.click(LoginPage.loginSubmitBtn, 'submit login');
  await Actions.fillByTestId(LoginPage.passwordTxt, process.env.JIRA_PASSWORD, 'password input');
  await Actions.click(LoginPage.loginSubmitBtn, 'submit login');
  const email = process.env.JIRA_EMAIL;
  await Actions.clickByRoleAndHandleNewTab(jiraDashboardBtn(email), 'link', 'Jira dashboard');
});
