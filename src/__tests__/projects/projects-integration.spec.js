import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import express from 'express';
import routes from '../../routes/index.js';
import Project from '../../api/models/project.model.js';

let mongoServer;
const app = express();
app.use(express.json());
app.use('/api', routes);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Project.deleteMany({});
});

describe('Projects API Integration Tests', () => {
  it('should fetch all projects', async () => {
    const project1 = new Project({
      name: 'Project 1',
      description: 'Description 1',
    });
    const project2 = new Project({
      name: 'Project 2',
      description: 'Description 2',
    });
    await project1.save();
    await project2.save();

    const response = await request(app).get('/api/projects');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].name).toBe('Project 1');
    expect(response.body[1].name).toBe('Project 2');
  });

  it('should fetch project by slug', async () => {
    const project1 = new Project({
      name: 'Project 1',
      slug: 'project-1',
      description: 'Description 1',
    });
    await project1.save();

    const response = await request(app).get('/api/projects/project-1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe('Project 1');
  });

  it('should return empty list if no projects are found', async () => {
    const response = await request(app).get('/api/projects');

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  it('should return 500 if project with duplicate name is being saved', async () => {
    let error;
    const project1 = new Project({
      name: 'Project 1',
    });
    const project2 = new Project({
      name: 'Project 1',
    });
    await project1.save();

    try {
      await project2.save();
    } catch (err) {
      error = err;
    }
    expect(error.name).toBe('MongoServerError');
    expect(error.code).toBe(11000);
  });
});
