const { Before, After, Status } = require('@cucumber/cucumber');
const BrowserManager = require('../../../../core/ui/browser_manager');
const logger = require('../../../../core/utils/logger');

Before({ tags: '@openBrowser' }, async function (scenario) {
  logger.scenario(`Initializing scenario: ${scenario.pickle.name}`);
  await BrowserManager.createBrowser();
});

After({ tags: '@closeBrowser' }, async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    logger.error(`${scenario.pickle.name} is failing`);
    await BrowserManager.page.screenshot({ path: `screenshots/${scenario.pickle.name}.png` });
  }
  logger.step(`Clogin browser scenario: ${scenario.pickle.name}`);
  await BrowserManager.closeBrowser();
});
