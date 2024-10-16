class TopBarPage {
  jiraLogoLnk = 'a[href="/jira"]';
  profileIconBtn = '[id="atlassian-navigation.ui.profile.icon"]';
  profileUserNameLbl = (userName) => `// a[@data-vc="link-item"] // div[text()="${userName}"]`;
}

module.exports = new TopBarPage();
