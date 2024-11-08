export function getProjects(req, res) {
  res.send('Get projects');
}

export function getProjectById(req, res) {
  const { id } = req.params;
  res.send(`Get project for id: ${id}`);
}
