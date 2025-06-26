const request = require('supertest');
const app = require('../src/app');

const { Note, sequelize } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Notebook endpoints', () => {

  // Render / page
  it('Should render new note form', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('<form');
  });

  // Create a new note
  it('Should create a new note', async () => {
    const res = await request(app)
      .post('/new')
      .type('form')
      .send({ title: 'Test Note', content: 'Contenu test' });

    expect(res.statusCode).toBe(302);

    const notes = await Note.findAll();
    expect(notes.length).toBe(1);
    expect(notes[0].title).toBe('Test Note');
  });

  // Render edit page of a note
  it('Should render edit form for existing note', async () => {
    const note = await Note.create({ title: 'Edit me', content: '...' });

    const res = await request(app).get(`/edit/${note.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain(note.title);
  });

  // Edit a note
  it('Should update a note', async () => {
    const note = await Note.create({ title: 'Old', content: 'Old content' });

    const res = await request(app)
      .post(`/edit/${note.id}`)
      .type('form')
      .send({ title: 'Updated', content: 'New content' });

    expect(res.statusCode).toBe(302);

    const updated = await Note.findByPk(note.id);
    expect(updated.title).toBe('Updated');
    expect(updated.content).toBe('New content');
  });

  // Edit a non-existent note
  it('Should return 404 when editing non-existent note', async () => {
    const res = await request(app).get('/edit/9999');
    expect(res.statusCode).toBe(404);
  });

  // Delete a note
  it('Should delete a note', async () => {
    const note = await Note.create({ title: 'Delete me', content: '...' });

    const res = await request(app)
      .post(`/delete/${note.id}`)
      .type('form')
      .send();

    expect(res.statusCode).toBe(302);

    const deleted = await Note.findByPk(note.id);
    expect(deleted).toBeNull();
  });

  // Delete a non-existent note
  it('Should return 404 when deleting non-existent note', async () => {
    const res = await request(app)
      .post('/delete/9999')
      .type('form')
      .send();

    expect(res.statusCode).toBe(404);
  });

  // Change language
  it('Should change language via /lang/:locale', async () => {
    const res = await request(app).get('/lang/fr');
    expect(res.statusCode).toBe(302);
    expect(res.headers['set-cookie'][0]).toContain('lang=fr');
  });
});

