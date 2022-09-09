const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb://localhost:27017/IMDB");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: Number,
  realeaseDate: String,
  earning: { type: Number, default: 1000, min: 0, max: 10000 },
  cast: { type: [String] },
  language: {
    type: String,
    enum: ["English", "Hindi"],
  },
});

const MovieModel = mongoose.model("movie", MovieSchema);
module.exports = { MovieModel, connection };
