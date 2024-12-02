import Project from '../../models/project.model.js';

export async function getProjects(req, res) {
  try {
    const projects = await Project.find();
    return res.send(projects);
  } catch (err) {
    console.error('Error fetching projects', err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

export async function getProjectBySlug(req, res) {
  const { slug } = req.params;
  try {
    const project = await Project.findBySlug(slug);
    project.length > 0
      ? res.send(project)
      : res.status(404).send({ message: 'No project found' });
  } catch (err) {
    console.error(`Error fetching project by name: ${name}`, err);
    res.status(500).send({ message: 'Internal server error' });
  }
}
