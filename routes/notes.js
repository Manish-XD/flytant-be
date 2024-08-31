const express  = require('express');

const notesContoller = require('../controllers/notes');

const router = express.Router();

router.get('/', notesContoller.getNotes);

router.get('/:noteId', notesContoller.getNote);

router.post('/', notesContoller.addNote);

router.post('/:noteId', notesContoller.editNote);

router.post('/deleteNote/:noteId', notesContoller.deleteNote);

module.exports = router;
