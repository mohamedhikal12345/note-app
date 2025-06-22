// controllers/noteController.js
const Note = require('../models/Note'); // Adjust based on your database choice

// Get all notes
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find(); // For MongoDB
        // For PostgreSQL, use: const notes = await Note.findAll();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new note
// exports.createNote = async (req, res) => {
//     const { title, content, createdBy } = req.body;
//     const note = new Note({ title, content, createdBy });
//     try {
//         await note.save(); // For MongoDB
//         // For PostgreSQL, use: const newNote = await Note.create({ title, content, createdBy });
//         res.status(201).json(note);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
exports.createNote = async (req, res) => {
    const { title, content, createdBy } = req.body;
    const note = new Note({ title, content, createdBy });
    try {
        const savedNote = await note.save();
        res.status(201).json({
            noteId: savedNote.noteId,
            title: savedNote.title,
            content: savedNote.content,
            createdBy: savedNote.createdBy,
            createdOn: savedNote.createdOn
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Update a note
// exports.updateNote = async (req, res) => {
//     const { id } = req.params;
//     const { title, content } = req.body;
//     try {
//         const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true }); // For MongoDB
//         // For PostgreSQL, use: const note = await Note.update({ title, content }, { where: { id } });
//         res.json(note);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
exports.updateNote = async (req, res) => {
    const { noteId } = req.params;
    const { title, content } = req.body;
    try {
        const note = await Note.findOneAndUpdate({ noteId }, { title, content }, { new: true });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({
            noteId: note.noteId,
            title: note.title,
            content: note.content,
            createdBy: note.createdBy,
            createdOn: note.createdOn
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Delete a note
// exports.deleteNote = async (req, res) => {
//     const { id } = req.params;
//     try {
//         await Note.findByIdAndDelete(id); // For MongoDB
//         // For PostgreSQL, use: await Note.destroy({ where: { id } });
//         res.status(204).send();
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
exports.deleteNote = async (req, res) => {
    const { noteId } = req.params;
    try {
        const note = await Note.findOneAndDelete({ noteId });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};