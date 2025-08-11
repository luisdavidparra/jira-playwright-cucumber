class TopBarPage {
  jiraLogo = '[data-testid="atlassian-navigation--product-home--container"]';
  profileIconBtn = '[data-testid="atlassian-navigation--secondary-actions--profile--trigger"]';
  profileUserNameLbl = (userName) =>
    `//*[@data-testid="atlassian-navigation--secondary-actions--profile--content--details--name" and text()="${userName}"]`;
  createBtn = 'atlassian-navigation--create-button';
}

module.exports = new TopBarPage();
