const express = require("express");

const NotesModel = require("../models/Notes.model");

const notesController = express.Router();

notesController.post("/create", async (req, res) => {
  const { title, note, label, userId } = req.body;
  const new_note = new NotesModel({
    title,
    note,
    label,
    userId,
  });
  await new_note.save();
  res.send({ message: "note created", new_note });
});

notesController.get("/", async (req, res) => {
  const { userId } = req.body;
  const notes = await NotesModel.find({ userId });
  res.send(notes);
});

notesController.patch("/:noteId/edit", async (req, res) => {
  const { noteId } = req.params;
  const { userId } = req.body;
  const note = await NotesModel.findOne({ _id: noteId });

  if (note.userId === userId) {
    const new_note = await NotesModel.findOneAndUpdate(
      { _id: noteId },
      req.body,
      { new: true }
    );
    return res.send({ message: "successfully updated", new_note });
  } else {
    return res.send("you are not authorised to do it");
  }
});

notesController.delete("/:noteId/delete", async (req, res) => {
  const { noteId } = req.params;
  const { userId } = req.body;
  const note = await NotesModel.findOne({ _id: noteId });

  if (note.userId === userId) {
    await NotesModel.findOneAndDelete({ _id: noteId });
    return res.send({ message: "successfully deleted" });
  } else {
    return res.send("you are not authorised to do it");
  }
});

module.exports = notesController;
