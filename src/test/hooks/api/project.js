const { Before, After } = require('@cucumber/cucumber');
const requestManager = require('../../../../core/api/request_manager');
const { projects, createProject, deleteProjectById } = require('../../../../jira/api/resources');
const dotenv = require('dotenv');
const testdata = require('../../../../test-data');
dotenv.config();

async function deleteTestProjects() {
  const res = await requestManager.sendRequest('get', projects);

  await Promise.all(
    res.data.values.map(async (project) => {
      if (project.name.includes(testdata.name)) {
        await requestManager.sendRequest('delete', deleteProjectById(project.id));
      }
    })
  );
}

async function createTestProject() {
  const body = testdata;

  try {
    await requestManager.sendRequest('post', createProject, body);
  } catch (error) {
    console.error(error.response?.data || error.message || error);
  }
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
