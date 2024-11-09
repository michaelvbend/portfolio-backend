import Project from '../../models/project.model.js';

export async function getProjects(req, res) {
  try {
    const projects = await Project.find();
    return sendProjectsResponse(projects, res);
  } catch (err) {
    console.error('Error fetching projects', err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

export async function getProjectByName(req, res) {
  const { name } = req.params;
  try {
    const project = await Project.findByName(name);
    return sendProjectsResponse(project, res);
  } catch (err) {
    console.error(`Error fetching project by name: ${name}`, err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

function sendProjectsResponse(projectList, res) {
  return projectList.length > 0
    ? res.send(projectList)
    : res.status(404).send({ message: 'No projects found' });
}
