import Project from '../../models/project.model.js';
import {
  getProjects,
  getProjectBySlug,
} from '../../routes/projects/projects.controller.js';

jest.mock('../../models/project.model.js');

const mockRequest = {
  method: 'GET',
  params: {
    slug: 'project-1',
  },
};

const mockResponse = {
  send: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

describe('Get all projects', () => {
  it('should return projects when found', async () => {
    const mockProjects = [{ name: 'Project 1' }, { name: 'Project 2' }];

    Project.find.mockResolvedValue(mockProjects);
    await getProjects(mockRequest, mockResponse);

    expect(Project.find).toHaveBeenCalled();
    expect(mockResponse.send).toHaveBeenCalledWith(mockProjects);
  });

  it('should return empty list when no projects are found', async () => {
    Project.find.mockResolvedValue([]);

    await getProjects(mockRequest, mockResponse);

    expect(mockResponse.send).toHaveBeenCalledWith([]);
  });

  it('should return 500 on error', async () => {
    const errorMessage = 'Database error';
    Project.find.mockRejectedValue(errorMessage);

    await getProjects(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: 'Internal server error',
    });
  });
});

describe('Get project by slug', () => {
  it('should return project when found by slug', async () => {
    const projectSlug = 'project-1';
    const mockProjects = [{ name: 'Project 1' }];

    Project.findBySlug.mockResolvedValue(mockProjects);
    await getProjectBySlug(mockRequest, mockResponse);

    expect(Project.findBySlug).toHaveBeenCalledWith(projectSlug);
    expect(mockResponse.send).toHaveBeenCalledWith(mockProjects);
  });

  it('should return 404 when no projects are found', async () => {
    Project.findBySlug.mockResolvedValue([]);

    await getProjectBySlug(mockRequest, mockResponse);

    expect(mockResponse.send).toHaveBeenCalledWith({
      message: 'No project found',
    });
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });
});
