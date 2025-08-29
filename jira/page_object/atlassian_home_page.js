class AtlassianHomePage {
  jiraDashboardBtn = (email) => `Jira ${email.split('@')[0]}`;
}

module.exports = new AtlassianHomePage();
