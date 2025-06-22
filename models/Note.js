// models/Note.js
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const noteSchema = new mongoose.Schema({
    noteId: { type: Number, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
});
noteSchema.plugin(AutoIncrement, { inc_field: 'noteId' });

module.exports = mongoose.model('Note', noteSchema);