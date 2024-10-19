const { expect } = require('@playwright/test');
const BrowserManager = require('./browser_manager');

async function expectToBeVisible(locator) {
  await expect(BrowserManager.page.locator(locator)).toBeVisible();
}

module.exports = { expectToBeVisible };
