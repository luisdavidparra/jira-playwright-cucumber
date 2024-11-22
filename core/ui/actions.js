const logger = require('../utils/logger');
const BrowserManager = require('./browser_manager');

async function goto(url) {
  logger.info(`Going to ${url}`);
  await BrowserManager.page.goto(url);
}

async function click(locator, elementName) {
  logger.info(`Clicking on ${elementName}`);
  await BrowserManager.page.waitForSelector(locator);
  await BrowserManager.page.click(locator);
}

async function clickByTestId(locator, elementName) {
  logger.info(`Clicking on ${elementName}`);
  await BrowserManager.page.getByTestId(locator).click();
}

async function clickByRole(text, role, elementName, exact = false) {
  logger.info(`Clicking on ${elementName}`);
  await BrowserManager.page.getByRole(role, { name: text, exact }).click();
}

async function clickByLabel(label, elementName, exact = false) {
  logger.info(`Clicking on ${elementName}`);
  await BrowserManager.page.getByLabel(label, { exact }).click();
}

async function clickByTestIdWithLabel(locator, label, elementName) {
  logger.info(`Clicking on ${elementName}`);
  await BrowserManager.page.getByTestId(locator).getByLabel(label).click();
}

async function clickByText(text, elementName, exact = false) {
  logger.info(`Clicking on ${elementName}`);
  await BrowserManager.page.getByText(text, { exact }).click();
}

async function fill(locator, value, elementName) {
  logger.info(`Filling ${elementName} element with ${value}`);
  await BrowserManager.page.waitForSelector(locator);
  await BrowserManager.page.fill(locator, value);
}

async function fillByTestId(locator, value, elementName) {
  logger.info(`Filling ${elementName} element with ${value}`);
  await BrowserManager.page.getByTestId(locator).fill(value);
}

async function waitForElementToHide(locator, elementName) {
  logger.info(`Waiting for ${elementName} element to hide`);
  await BrowserManager.page.waitForSelector(locator, { state: 'hidden' });
}

async function reloadPage() {
  logger.info('Reloading page');
  await BrowserManager.page.reload();
}

async function mouseHover(locator, elementName) {
  logger.info(`Hovering mouse over ${elementName}`);
  await BrowserManager.page.hover(locator);
}

async function pausePage() {
  logger.info('Stopping execution');
  await BrowserManager.page.pause();
}

module.exports = {
  goto,
  click,
  clickByTestId,
  clickByRole,
  clickByLabel,
  clickByTestIdWithLabel,
  clickByText,
  fill,
  fillByTestId,
  waitForElementToHide,
  reloadPage,
  mouseHover,
  pausePage,
};
