const { expect } = require('@playwright/test');
const BrowserManager = require('./browser_manager');

async function expectToBeVisible(locator) {
  await BrowserManager.page.waitForSelector(locator);
  await expect(BrowserManager.page.locator(locator)).toBeVisible();
}

async function expectToBeVisibleHasText(locator, text) {
  await expect(BrowserManager.page.locator(locator).filter({ hasText: text })).toBeVisible();
}

async function expectToHaveAttribute(locator, attribute, expectedValue) {
  await expect(BrowserManager.page.locator(locator)).toHaveAttribute(attribute, expectedValue);
}

async function expectToContainText(locator, expectedValue) {
  await expect(BrowserManager.page.locator(locator)).toContainText(expectedValue);
}

async function expectToBeVisibleByRole(text, role, exact = false) {
  await expect(BrowserManager.page.getByRole(role, { name: text, exact })).toBeVisible();
}

module.exports = {
  expectToBeVisible,
  expectToBeVisibleHasText,
  expectToHaveAttribute,
  expectToContainText,
  expectToBeVisibleByRole,
};
