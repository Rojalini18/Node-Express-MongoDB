const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: { type: String, require: true },
  note: { type: String, require: true },
  label: String,
  userId: { type: String, require: true },
});

const NoteModel = mongoose.model("note", noteSchema);

module.exports = NoteModel;
