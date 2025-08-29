const logger = require('../utils/logger');
const BrowserManager = require('./browser_manager');

async function goto(url) {
  logger.info(`Going to ${url}`);
  await BrowserManager.page.goto(url);
}

async function getAttribute(locator, attribute) {
  logger.info(`Getting ${attribute} attribute`);
  const sasdad = await BrowserManager.page.locator(locator);
  return await sasdad.getAttribute(attribute);
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

async function clickByRoleAndHandleNewTab(text, role, elementName, exact = false) {
  logger.info(`Clicking on ${elementName} (expecting new tab)`);

  const context = BrowserManager.page.context();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    BrowserManager.page.getByRole(role, { name: text, exact }).click(),
  ]);

  await newPage.waitForLoadState('domcontentloaded');

  BrowserManager.page = newPage;
  logger.info('Switched to new tab');

  return newPage;
}

async function clickIfIsCollapsed(locator, attribute) {
  const element = BrowserManager.page.locator(locator);
  const isExpanded = await element.getAttribute(attribute);

  if (isExpanded === 'false') {
    await element.click();
  }
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

async function tryClick2FASkipButton(locator) {
  logger.info('Trying to click 2FA skip button if visible...');

  try {
    const element = BrowserManager.page.locator(locator);

    if (await element.isVisible({ timeout: 3000 })) {
      logger.info('2FA skip button is visible. Clicking...');
      await element.click();
      await waitForLoadState();
    } else {
      logger.info('2FA skip button not visible. Continuing...');
    }
  } catch (error) {
    logger.error(error);
  }
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

async function waitForLoadState() {
  logger.info(`Waiting for next page to load`);
  await BrowserManager.page.waitForLoadState('networkidle');
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
  getAttribute,
  click,
  clickByTestId,
  clickByRole,
  clickByRoleAndHandleNewTab,
  clickByLabel,
  clickByTestIdWithLabel,
  clickByText,
  tryClick2FASkipButton,
  clickIfIsCollapsed,
  fill,
  fillByTestId,
  waitForElementToHide,
  waitForLoadState,
  reloadPage,
  mouseHover,
  pausePage,
};
