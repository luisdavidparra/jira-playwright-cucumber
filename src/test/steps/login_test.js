const { Given, When, Then } = require('@cucumber/cucumber');
const BrowserManager = require('../../../core/browser_manager');
const { expect } = require('@playwright/test');
const LoginPage = require('../../../jira/page_object/login_page');
const { jiraDashboardBtn } = require('../../../jira/page_object/atlassian_home_page');
const TopBarPage = require('../../../jira/page_object/top_bar_page');
dotenv = require('dotenv').config();

Given('I navigate to Atlassian login page', async () => {
  await BrowserManager.page.goto('https://id.atlassian.com/login');
});

When('I introduce the user values to login:', async (userValues) => {
  let values = { email: '', password: '' };
  this.userValues = userValues.rowsHash();

  Object.keys(this.userValues).forEach((key) => {
    values[key] = process.env[this.userValues[key]] || this.userValues[key];
  });

  await BrowserManager.page.getByTestId(LoginPage.usernameTxt).fill(values.email);
  await BrowserManager.page.locator(LoginPage.loginSubmitBtn).click();
  await BrowserManager.page.getByTestId(LoginPage.passwordTxt).fill(values.password);
});

When('I click on submit login button', async () => {
  await BrowserManager.page.locator(LoginPage.loginSubmitBtn).click();
});

When('I click on Jira dashboard button', async () => {
  const email = process.env.JIRA_EMAIL;
  await BrowserManager.page.getByRole('link', jiraDashboardBtn(email)).click();
});

Then('I verify that page shows Jira title', async () => {
  await expect(BrowserManager.page.locator(TopBarPage.jiraLogoLnk)).toBeVisible();
});

Then('I verify that user {string} is logged', async (user) => {
  const userName = process.env[user];
  await BrowserManager.page.waitForSelector(TopBarPage.profileIconBtn);
  await BrowserManager.page.locator(TopBarPage.profileIconBtn).click();
  await expect(BrowserManager.page.locator(TopBarPage.profileUserNameLbl(userName))).toBeVisible();
});
