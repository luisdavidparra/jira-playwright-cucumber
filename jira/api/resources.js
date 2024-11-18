module.exports = {
  projects: '/rest/api/3/project',
  deleteProjectById: (id) => `/rest/api/3/project/${id}?enableUndo=false`,
};
