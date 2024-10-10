const { Before, After } = require('@cucumber/cucumber');
const BrowserManager = require('../../../core/browser_manager');

Before({ tags: '@openBrowser' }, async function () {
  await BrowserManager.createBrowser();
});

After({ tags: '@closeBrowser' }, async function () {
  BrowserManager.closeBrowser();
});
