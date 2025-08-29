class ProjectPage {
  createProjectsBtn = '[data-testid*="projects-container"] [role="presentation"] span svg';
  templateOptionBtn = (templateName) => `li [aria-label="${templateName}"]`;
  useTemplateBtn =
    'project-template-select-v2.ui.layout.screens.template-overview.template-overview-card.use-template-button.button';
  projectFormNameTxt = 'project-create.create-form.name-field.input';
  projectFormKeyTxt = 'project-create.create-form.advanced-dropdown.key-field.textfield';
  projectTeamTypeCbo = '.project-create\\.create-form\\.department-type-select__input-container';
  submitCreateProjectBtn =
    '[data-testid="project-create.create-screen-with-project-type-dropdown.submit-button"]';
  projectSettingsDetailsBtn = '[href$="/settings/details"]';
  projectSettingsNameTxt = 'input[id^="projectName-uid"]';
  projectSettingsKeyTxt = 'input[id^="projectKey-uid"]';
  projectSettingsTypeLbl =
    '[class*="project-create.create-form.department-type-select__single-value"]';
  projectCreationErrorDescriptionLbl = '[id="project-create.create-form.name-field.error"]';
  searchFiledTxt = 'searchfield';
  projectsListContainer =
    '[data-testid="global-pages.directories.projects-directory-v3.ui.page-layout.projects-list.container"]';
  filterByProductBtn = '[aria-label="open"]';
  todoBoardSectionTbl =
    '[data-testid="platform-board-kit.ui.column.draggable-column.styled-wrapper"]';
  projectViewsBtn = (projectKey) =>
    `[data-testid*="container"] [href*="/jira/servicedesk/projects/${projectKey}/boards"]`;
}

module.exports = new ProjectPage();
