import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('Items (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/items (POST) => creates an item', async () => {
    const createDto = { name: 'E2E Item', completed: false };
    const response = await request(app.getHttpServer())
      .post('/items')
      .send(createDto)
      .expect(201);

    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe('E2E Item');
    expect(response.body.completed).toBe(false);
  });

  it('/items (GET) => returns an array of items', async () => {
    const response = await request(app.getHttpServer())
      .get('/items')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    // Could do more checks if you have data
  });

  it('/items/:id (GET) => returns single item', async () => {
    // create an item first
    const newItem = await request(app.getHttpServer())
      .post('/items')
      .send({ name: 'Temp Item', completed: true });

    const createdId = newItem.body.id;
    const response = await request(app.getHttpServer())
      .get(`/items/${createdId}`)
      .expect(200);

    expect(response.body.name).toBe('Temp Item');
    expect(response.body.completed).toBe(true);
  });

  it('/items/:id (PATCH) => updates item', async () => {
    // create an item first
    const newItem = await request(app.getHttpServer())
      .post('/items')
      .send({ name: 'Updatable Item' });

    const createdId = newItem.body.id;
    const updateRes = await request(app.getHttpServer())
      .patch(`/items/${createdId}`)
      .send({ name: 'New Name', completed: true })
      .expect(200);

    expect(updateRes.body.name).toBe('New Name');
    expect(updateRes.body.completed).toBe(true);
  });

  it('/items/:id (DELETE) => deletes item', async () => {
    // create an item first
    const newItem = await request(app.getHttpServer())
      .post('/items')
      .send({ name: 'Deletable Item' });

    const createdId = newItem.body.id;
    await request(app.getHttpServer())
      .delete(`/items/${createdId}`)
      .expect(200);

    // Try to fetch it again - expecting 200 or 404 depending on your logic
    const fetchDeleted = await request(app.getHttpServer())
      .get(`/items/${createdId}`)
      .expect(200);

    // If your code throws 404 for missing item, do `.expect(404)` instead
    // If your code returns null, you can check `fetchDeleted.body === null` etc.
    // Adjust these checks to match your actual error handling.
  });
});
