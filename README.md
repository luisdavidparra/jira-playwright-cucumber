# 🧪 QA Automation: Jira with Playwright + Cucumber

This project automates UI tests for Jira web application.  
It covers key functionalities such as:

- **Authentication** (login).
- **Project management** (create, edit, delete).
- **API validations** (creating and deleting projects).

The goal is to provide a reliable and reusable test automation framework using BDD with Cucumber and cross-browser testing with Playwright.

## 🎥 Demo Scenario 03

![test-03](https://github.com/user-attachments/assets/2e23460c-524d-4e7b-ac52-e037a4bca997)


## 📌 Features
- Automated UI and API test scenarios.
- Scenarios written in Gherkin (BDD).
- Test execution in Chrome and Firefox.
- HTML reports generated with Cucumber.
- Environment variable configuration support.

---

## 🛠 Tech Stack
- **Playwright**: UI test automation.
- **Cucumber.js**: BDD scenarios.
- **Node.js** + **npm**.
- **dotenv**: environment variables management.

---

## 🚀 Run Locally

> ⚠️ **Note:** This project previously ran on GitHub Actions.  
> Due to Atlassian MFA (multi-factor authentication) requirements,  
> tests now can only be executed locally with valid credentials.

Follow these steps to run the app locally:

### 1. Clone the repository
```bash 
git clone https://github.com/luisdavidparra/jira-playwright-cucumber
```


### 2.  Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create `.env` file from `.env.example` and set `.env` variables.

[Jira API TOKEN generation steps](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/)


### 4. Execute test suite and generate HTML report
```bash
npm run test 
```

##  📊 Test Report

<img width="1920" height="1080" alt="cucumber-report" src="https://github.com/user-attachments/assets/f0c9fa34-62a0-45a1-9962-7556d35f5b59" />
