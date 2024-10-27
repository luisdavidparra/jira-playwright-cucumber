const { Before, After } = require('@cucumber/cucumber');
const requestManager = require('../../../../core/api/request_manager');
const { getProjects, deleteProjectById } = require('../../../../jira/api/resources');

async function deleteTestProjects() {
  const res = await requestManager.sendRequest('get', getProjects);

  await Promise.all(
    res.data.map(async (project) => {
      if (project.name.includes('project-automation-test')) {
        await requestManager.sendRequest('delete', deleteProjectById(project.id));
      }
    })
  );
}

Before('@deleteProject', async function () {
  await deleteTestProjects();
});

After('@deleteProject', async function () {
  await deleteTestProjects();
});
