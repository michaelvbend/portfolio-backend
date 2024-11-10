import Project from '../models/project.model.js';
import {
  getProjects,
  getProjectByName,
} from '../routes/projects/projects.controller.js';

jest.mock('../models/project.model.js');

const mockRequest = {
  method: 'GET',
  params: {
    name: 'Project 1',
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

  it('should return 404 when no projects are found', async () => {
    Project.find.mockResolvedValue([]);

    await getProjects(mockRequest, mockResponse);

    expect(mockResponse.send).toHaveBeenCalledWith({
      message: 'No projects found',
    });
    expect(mockResponse.status).toHaveBeenCalledWith(404);
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

describe('Get project by name', () => {
  it('should return project when found by name', async () => {
    const projectName = 'Project 1';
    const mockProjects = [{ name: 'Project 1' }];

    Project.findByName.mockResolvedValue(mockProjects);
    await getProjectByName(mockRequest, mockResponse);

    expect(Project.findByName).toHaveBeenCalledWith(projectName);
    expect(mockResponse.send).toHaveBeenCalledWith(mockProjects);
  });

  it('should return 404 when no projects are found', async () => {
    Project.findByName.mockResolvedValue([]);

    await getProjectByName(mockRequest, mockResponse);

    expect(mockResponse.send).toHaveBeenCalledWith({
      message: 'No projects found',
    });
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });
});
