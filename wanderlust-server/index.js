import express from "express";
import { MongoClient } from 'mongodb';
import 'dotenv/config'

// const express = require('express');
const app = express()
const PORT = 5000

// MongoDB
const client = new MongoClient(process.env.MONGODB_URL);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

connectToMongoDB();

// // Call this only when your application terminates
// export async function disconnectFromMongoDB() {
//   await client.close();
// }

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})