const mongoose = require("mongoose");
const { Schema, model } = mongoose;
require('dotenv').config();

const url = process.env.MONGO_KEY;

mongoose.connect(url)
.then(() => {
  console.log('Successfully connected to MongoDB Atlas SCHEMA');
})
.catch((error) => {
  console.error('Error connecting to MongoDB Atlas SCHEMA:', error);
});

const playlistSchema = new Schema({
  src: { type: String, required: true },
  time: { type: String, required: true },
  mood: { type: String, required: true },
});

const Playlist = model('Playlist', playlistSchema);

module.exports = { Playlist };
