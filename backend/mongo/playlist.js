const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const url = process.env.MONGO_KEY;
mongoose.connect(url)

const playlistSchema = new Schema({
    src: String,
    time: String,
    mood: String,
})