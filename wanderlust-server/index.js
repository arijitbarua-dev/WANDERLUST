import express from "express";
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import cors from "cors";

// const express = require('express');
const app = express()
const PORT = 5000

app.use(cors());
app.use(express.json())

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

const mongoClient = await connectToMongoDB();
const db = mongoClient.db("Wanderlust");
const destinationCollection = db.collection("destination");

// // Call this only when your application terminates
// export async function disconnectFromMongoDB() {
//   await client.close();
// }

app.post('/add-destination', async (req, res) => {
  const data = req.body;
  const result = await destinationCollection.insertOne(data);
  console.log(result);
  res.send(result);
})

app.get('/destinations', async (req, res) => {
  const result = await destinationCollection.find().toArray();
  res.send(result);
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})