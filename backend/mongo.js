const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");

require("dotenv").config()
const { Playlist } = require('./playlist');

const url = process.env.MONGO_KEY;
const client = new MongoClient(url);
mongoose.connect(url);

async function connectToMongo(){
    try{
        await client.connect();
        console.log("Connected to database")
    }catch(e){
        console.error("Error connecting to mongo", e);
        throw e;
    }
}

async function closeMongo(){
    try{
        await client.close();
        console.log("Closed database");
    }catch(e){
        console.error("Error closing connection", e);
        throw e;
    }
}

async function insertData(collectionName, data) {
    const db = await connectToMongo();
    const collection = db.collection(collectionName);
    try {
        const result = await collection.insertOne(data);
        console.log(`Successfully inserted item with _id: ${result.insertedId}`);
    } catch (e) {
        console.error("Error inserting data", e);
        throw e;
    } 
}

async function deleteAll(){
    await Playlist.deleteMany({});
}

async function deletePlaylist(playlist){
    await Playlist.deleteOne({time: playlist.time});
}

async function newPlaylist(src, time, mood) {
    try {
      const playlist = await Playlist.create({
        src: src,
        time: time,
        mood: mood,
      });
      console.log(playlist);
    } catch (error) {
      console.error('Error creating new playlist:', error);
    }
  }

module.exports = { connectToMongo, closeMongo, deleteAll, deletePlaylist, newPlaylist };