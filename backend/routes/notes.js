import express from 'express';
import Note from '../models/Note.js';

const router = express.Router();

// Get all notes with optional search and subject filter
router.get('/', async (req, res) => {
  try {
    const { search, subject } = req.query;
    let query = {};

    // Add text search if search parameter is provided
    if (search) {
      query.$text = { $search: search };
    }

    // Add subject filter if subject is provided and not 'all'
    if (subject && subject !== 'all') {
      query.subject = subject;
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new note
router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    description: req.body.description,
    subject: req.body.subject,
    pdfUrl: req.body.pdfUrl,
    thumbnail: req.body.thumbnail
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a note
router.patch('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] != null) {
        note[key] = req.body[key];
      }
    });

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    await note.deleteOne();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;