const express = require("express");
const authMiddleware = require('../middleware/authMiddleware');
const { 
    getAllNotes, 
    getNoteId, 
    createNote, 
    updateNote,
    deleteNote
} = require('../controllers/noteControllers');

const router = express.Router();

// Routes des operations CRUD
router.get('/', authMiddleware, getAllNotes);
router.post('/', authMiddleware, createNote);
router.get('/:id', authMiddleware, getNoteId);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

module.exports = router;