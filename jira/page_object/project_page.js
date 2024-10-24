class ProjectPage {
  createProjectsBtn = 'global-pages.directories.projects-directory-v3.create-projects-button';
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
}

module.exports = new ProjectPage();
