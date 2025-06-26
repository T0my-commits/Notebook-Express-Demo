const express = require('express');
const router = express.Router();
const { Note } = require('../models');

// List all notes
router.get('/', async (req, res) => {
  const notes = await Note.findAll();
  res.render('index', { notes });
});

// Display the form to create a new note
router.get('/new', (req, res) => {
  res.render('note', { note: null });
});

// Create a new note
router.post('/new', async (req, res) => {
  try {
    await Note.create({ title: req.body.title, content: req.body.content });
    res.redirect('/');
  } catch (err) {
    res.status(500).send(req.__('error.add'));
  }
});

// Display the form to edit a note
router.get('/edit/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (!note) return res.status(404).send(req.__('error.not_found'));
  res.render('note', { note });
});

// Update an existing note
router.post('/edit/:id', async (req, res) => {
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
router.post('/delete/:id', async (req, res) => {
  try {
    const deletedCount = await Note.destroy({ where: { id: req.params.id } });

    if (deletedCount === 0) {
      return res.status(404).send(req.__('error.not_found'));
    }

    res.redirect('/');
  } catch (err) {
    res.status(500).send(req.__('error.delete'));
  }
});

// Change language route
router.get('/lang/:locale', (req, res) => {
  res.cookie('lang', req.params.locale);
  res.redirect('/');
});


module.exports = router;

