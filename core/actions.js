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

async function clickByRole(text, role, exact = false) {
  await BrowserManager.page.getByRole(role, { name: text, exact }).click();
}

async function fill(locator, value) {
  await BrowserManager.page.waitForSelector(locator);
  await BrowserManager.page.fill(locator, value);
}

async function fillByTestId(locator, value) {
  await BrowserManager.page.getByTestId(locator).fill(value);
}

async function waitForElementToHide(locator) {
  await BrowserManager.page.waitForSelector(locator, { state: 'hidden' });
}

async function reloadPage() {
  await BrowserManager.page.reload();
}

async function mouseHover(locator) {
  await BrowserManager.page.hover(locator);
}

module.exports = {
  goto,
  click,
  clickByTestId,
  clickByRole,
  fill,
  fillByTestId,
  waitForElementToHide,
  reloadPage,
  mouseHover,
};
