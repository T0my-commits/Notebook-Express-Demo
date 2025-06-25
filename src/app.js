const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Note } = require('./models');

const app = express();
const PORT = 3000;

const i18n = require('./i18n');
const cookieParser = require('cookie-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(i18n.init);
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, '..', 'node_modules', 'primeflex')));

// List all notes
app.get('/', async (req, res) => {
  const notes = await Note.findAll();
  res.render('index', { notes });
});

// Display the form to create a new note
app.get('/new', (req, res) => {
  res.render('note', { note: null });
});

// Create a new note
app.post('/new', async (req, res) => {
  try {
    await Note.create({ title: req.body.title, content: req.body.content });
    res.redirect('/');
  } catch (err) {
    res.status(500).send(req.__('error.add'));
  }
});

// Display the form to edit a note
app.get('/edit/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (!note) return res.status(404).send(req.__('error.not_found'));
  res.render('note', { note });
});

// Update an existing note
app.post('/edit/:id', async (req, res) => {
  try {
    await Note.update(
      { title: req.body.title, content: req.body.content },
      { where: { id: req.params.id } }
    );
    res.redirect('/');
  } catch (err) {
    res.status(500).send(req.__('error.update'));
  }
});

// Delete a note
app.post('/delete/:id', async (req, res) => {
  try {
    await Note.destroy({ where: { id: req.params.id } });
    res.redirect('/');
  } catch (err) {
    res.status(500).send(req.__('error.delete'));
  }
});

// Change language route
app.get('/lang/:locale', (req, res) => {
  res.cookie('lang', req.params.locale);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Bloc-notes avec PostgreSQL sur http://localhost:${PORT}`);
});

