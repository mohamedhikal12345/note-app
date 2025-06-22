const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.get('/notes', noteController.getNotes);
router.post('/notes', noteController.createNote);
router.put('/notes/:noteId', noteController.updateNote);
router.delete('/notes/:noteId', noteController.deleteNote);

module.exports = router;