const { Given, When, Then } = require('@cucumber/cucumber');
const BrowserManager = require('../../../core/browser_manager');
const { expect } = require('@playwright/test');
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

  await BrowserManager.page.getByTestId('username').fill(values.email);
  await BrowserManager.page.locator('#login-submit').click();
  await BrowserManager.page.getByTestId('password').fill(values.password);
});

When('I click on submit login button', async () => {
  await BrowserManager.page.locator('#login-submit').click();
});

When('I click on Jira dashboard button', async () => {
  const email = process.env.JIRA_EMAIL;
  await BrowserManager.page.getByRole('link', { name: `Jira ${email.split('@')[0]}` }).click();
});

Then('I verify that page shows Jira title', async () => {
  await expect(BrowserManager.page.locator('a[href="/jira"]')).toBeVisible();
});

Then('I verify that user {string} is logged', async (user) => {
  const userName = process.env[user];
  await BrowserManager.page.waitForSelector(
    '[data-test-id="ak-spotlight-target-profile-spotlight"]'
  );
  await BrowserManager.page
    .locator('[data-test-id="ak-spotlight-target-profile-spotlight"]')
    .click();
  await expect(
    BrowserManager.page.locator(`// a[@data-vc="link-item"] // div[text()="${userName}"]`)
  ).toBeVisible();
});
