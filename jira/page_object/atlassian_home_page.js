class AtlassianHomePage {
  jiraDashboardBtn = (email) => ({ name: `Jira ${email.split('@')[0]}` });
}

module.exports = new AtlassianHomePage();
