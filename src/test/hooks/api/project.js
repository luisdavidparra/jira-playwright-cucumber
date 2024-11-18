const { Before, After } = require('@cucumber/cucumber');
const requestManager = require('../../../../core/api/request_manager');
const { projects, deleteProjectById } = require('../../../../jira/api/resources');
const dotenv = require('dotenv');
dotenv.config();

async function deleteTestProjects() {
  const res = await requestManager.sendRequest('get', projects);

  await Promise.all(
    res.data.map(async (project) => {
      if (project.name.includes('default-project-automation-test')) {
        await requestManager.sendRequest('delete', deleteProjectById(project.id));
      }
    })
  );
}

async function createTestProject() {
  const body = {
    key: 'DPR',
    leadAccountId: process.env.LEAD_ACCOUNT_ID,
    name: `default-project-automation-test`,
    projectTypeKey: 'service_desk',
  };
  await requestManager.sendRequest('post', projects, body);
}

Before('@deleteProject', async function () {
  await deleteTestProjects();
});

Before('@createProject', async function () {
  await createTestProject();
});

After('@deleteProject', async function () {
  await deleteTestProjects();
});
