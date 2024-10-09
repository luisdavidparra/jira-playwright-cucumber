const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { expect, chromium } = require("@playwright/test");

setDefaultTimeout(60 * 1000);
let page, browser;

Before(async function () {
  browser = await chromium.launch({ headless: false });

  const context = await browser.newContext();

  page = await context.newPage();
});

Given("I go to playwright page", async function () {
  await page.goto("https://playwright.dev/");
});

When("I click on get started button", async function () {
  await page.getByRole("link", { name: "Get started" }).click();
});

Then("I verify that page shows {string} title", async function (titleText) {
  await expect(page.getByRole("heading", { name: titleText })).toBeVisible();
});

After(async function () {
  await browser.close();
});
