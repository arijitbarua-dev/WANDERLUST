import express from "express";
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';
import cors from "cors";
import { jwtVerify, createRemoteJWKSet } from 'jose';

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
const bookingCollection = db.collection("bookings");

// // Call this only when your application terminates
// export async function disconnectFromMongoDB() {
//   await client.close();
// }

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).send({
      msg: "Unauthorized! Token is missing.",
    });
  }

  const token = authHeader.split(" ")[1];

  console.log("Token:", token);

  if (!token) {
    return res.status(401).send({
      msg: "Unauthorized! Invalid token format.",
    });
  }

  const JWKS = createRemoteJWKSet(
    new URL('http://localhost:3000/api/auth/jwks')
  );

  try {
    const { payload } = await jwtVerify(token, JWKS);
    console.log(payload);
    // Token received successfully
    next();
  } catch (error) {
    return res.status(500).send({msg: "Server Error!"})
  }

  
};

app.post('/add-destination', verifyToken, async (req, res) => {
  const data = req.body;
  const result = await destinationCollection.insertOne(data);
  console.log(result);
  res.send(result);
})

app.get('/destinations', async (req, res) => {
  const result = await destinationCollection.find().toArray();
  res.send(result);
})

app.get("/destinations/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await destinationCollection.findOne({
      _id: new ObjectId(id),
    });

    // console.log("Destination:", result);

    if (!result) {
      return res.status(404).send({ msg: "Destination not found" });
    }

    res.send(result);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

app.patch('/destinations/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await destinationCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedData }
  );
  res.json(result);
})

app.delete('/destinations/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const result = await destinationCollection.deleteOne({ _id: new ObjectId(id) });
  res.json(result);
});

// Create a booking (Booking Details Page → bookings collection)
app.post('/bookings', async (req, res) => {
  const {
    userName,
    userImage,
    userId,
    destinationId,
    destinationName,
    destinationImage,
    price,
    departureDate,
    status,
  } = req.body;

  if (!userId || !destinationId) {
    return res.status(400).json({ error: "userId and destinationId are required." });
  }

  const booking = {
    userName,
    userImage,
    userId,
    destinationId,
    destinationName,
    destinationImage,
    price,
    departureDate,
    status: status || "Confirmed",
    createdAt: new Date(),
  };

  const result = await bookingCollection.insertOne(booking);
  res.status(201).send({ ...booking, _id: result.insertedId });
})

// Get all bookings of the current user (My Bookings page)
app.get('/bookings/:userId', verifyToken, async (req, res) => {
  const { userId } = req.params;
  const result = await bookingCollection.find({ userId }).toArray();
  res.send(result);
})

// Cancel (remove) a booking
app.delete('/bookings/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const _id = ObjectId.isValid(id) ? new ObjectId(id) : id;
  const result = await bookingCollection.deleteOne({ _id });

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "Booking not found." });
  }

  res.json(result);
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})