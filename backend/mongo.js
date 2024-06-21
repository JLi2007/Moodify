const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");

require("dotenv").config()
const { Playlist } = require('./playlist');

const url = process.env.MONGO_KEY;
const client = new MongoClient(url);
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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

async function newPlaylist() {
    try {
      const playlist = await Playlist.create({
        src: 'https://open.spotify.com/embed/playlist/2F6JtyDh4aHd77mfcxrz4R?utm_source=generator',
        time: 'matthew singer',
        mood: 'nonchalant',
      });
      console.log(playlist);
    } catch (error) {
      console.error('Error creating new playlist:', error);
    }
  }

module.exports = { connectToMongo, closeMongo, insertData, newPlaylist };