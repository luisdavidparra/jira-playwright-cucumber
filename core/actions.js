const BrowserManager = require('./browser_manager');

async function goto(url) {
  await BrowserManager.page.goto(url);
}

async function click(locator) {
  await BrowserManager.page.waitForSelector(locator);
  await BrowserManager.page.click(locator);
}

async function clickByTestId(locator) {
  await BrowserManager.page.getByTestId(locator).click();
}

async function clickByRole(locator, role) {
  await BrowserManager.page.getByRole(role, { name: locator }).click();
}

async function fill(locator, value) {
  await BrowserManager.page.waitForSelector(locator);
  await BrowserManager.page.fill(locator, value);
}

async function fillByTestId(locator, value) {
  await BrowserManager.page.getByTestId(locator).fill(value);
}

module.exports = {
  goto,
  click,
  clickByTestId,
  clickByRole,
  fill,
  fillByTestId,
};
