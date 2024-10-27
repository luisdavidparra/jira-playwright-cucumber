const { expect } = require('@playwright/test');
const BrowserManager = require('./browser_manager');

async function expectToBeVisible(locator) {
  await expect(BrowserManager.page.locator(locator)).toBeVisible();
}

async function expectToHaveAttribute(locator, attribute, expectedValue) {
  await expect(BrowserManager.page.locator(locator)).toHaveAttribute(attribute, expectedValue);
}

async function expectToContainText(locator, expectedValue) {
  await expect(BrowserManager.page.locator(locator)).toContainText(expectedValue);
}

module.exports = { expectToBeVisible, expectToHaveAttribute, expectToContainText };
