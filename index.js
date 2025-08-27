// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@omicronx.oj2lwua.mongodb.net/?retryWrites=true&w=majority`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB");

//     const carCollection = client.db('carRent').collection('cars');

//     // Get all cars or user-specific cars
//     app.get("/cars", async (req, res) => {
//       try {
//         const email = req.query.email;
//         const query = email ? { email } : {};
//         const cars = await carCollection.find(query).toArray();
//         res.send(cars);
//       } catch (err) {
//         console.error(err);
//         res.status(500).send({ message: "Failed to fetch cars" });
//       }
//     });

//     // Get single car by ID
//     app.get("/cars/:id", async (req, res) => {
//       try {
//         const id = req.params.id;
//         const car = await carCollection.findOne({ _id: new ObjectId(id) });
//         res.send(car);
//       } catch (err) {
//         console.error(err);
//         res.status(500).send({ message: "Failed to fetch car" });
//       }
//     });

//     // Add a new car
//     app.post("/cars", async (req, res) => {
//       try {
//         const newCar = req.body;

//         // Ensure email and createdAt fields exist
//         if (!newCar.email) {
//           return res.status(400).send({ message: "Email is required" });
//         }
//         newCar.createdAt = new Date();

//         const result = await carCollection.insertOne(newCar);
//         res.send(result);
//       } catch (err) {
//         console.error(err);
//         res.status(500).send({ message: "Failed to add car" });
//       }
//     });

//     // Ping to verify connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your MongoDB deployment successfully!");
    
//   } catch (err) {
//     console.error("MongoDB connection failed:", err);
//   }
// }

// run().catch(console.dir);

// // Root route
// app.get("/", (req, res) => {
//   res.send("Car Rental Backend Running!");
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });



const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@omicronx.oj2lwua.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const carCollection = client.db('carRent').collection('cars');

    // Get all cars or user-specific cars
    app.get("/cars", async (req, res) => {
      try {
        const email = req.query.email;
        const query = email ? { email } : {};
        const cars = await carCollection.find(query).toArray();
        res.send(cars);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to fetch cars" });
      }
    });

    // Get single car by ID
    app.get("/cars/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const car = await carCollection.findOne({ _id: new ObjectId(id) });
        res.send(car);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to fetch car" });
      }
    });

    // Add a new car
    app.post("/cars", async (req, res) => {
      try {
        const newCar = req.body;

        // Ensure email and createdAt fields exist
        if (!newCar.email) {
          return res.status(400).send({ message: "Email is required" });
        }
        newCar.createdAt = new Date();

        const result = await carCollection.insertOne(newCar);
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to add car" });
      }
    });

    // Ping to verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your MongoDB deployment successfully!");
    
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}

run().catch(console.dir);

// Root route
app.get("/", (req, res) => {
  res.send("Car Rental Backend Running!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
