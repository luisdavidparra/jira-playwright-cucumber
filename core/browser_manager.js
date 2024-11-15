const { setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, firefox } = require('@playwright/test');
dotenv = require('dotenv').config();

setDefaultTimeout(60 * 1000);

class BrowserManager {
  static browser;
  static context;
  static page;

  static async createBrowser() {
    const browserType = process.env.BROWSER;

    if (browserType === 'chromium') {
      this.browser = await chromium.launch({ headless: false });
    } else if (browserType === 'firefox') {
      this.browser = await firefox.launch({ headless: false });
    }

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  static async closeBrowser() {
    await this.browser.close();
  }
}

module.exports = BrowserManager;
