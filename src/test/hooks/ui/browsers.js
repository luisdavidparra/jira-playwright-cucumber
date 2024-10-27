const { Before, After, Status } = require('@cucumber/cucumber');
const BrowserManager = require('../../../../core/ui/browser_manager');

Before({ tags: '@openBrowser' }, async function () {
  await BrowserManager.createBrowser();
});

After({ tags: '@closeBrowser' }, async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    console.error(`${scenario.pickle.name} is failing`);
    await BrowserManager.page.screenshot({ path: `screenshots/${scenario.pickle.name}.png` });
  }
  await BrowserManager.closeBrowser();
});
