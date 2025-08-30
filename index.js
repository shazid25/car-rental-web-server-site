const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: ["https://car-rental-service-ae23a.web.app"] }));

app.use(express.json());

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@omicronx.oj2lwua.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const carCollection = client.db("carRent").collection("cars");

    //  Ensure all cars have default fields
    // await carCollection.updateMany(
    //   { features: { $exists: false } },
    //   {
    //     $set: {
    //       features: {
    //         GPS: false,
    //         AC: false,
    //         Bluetooth: false,
    //         HeatedSeats: false,
    //         Sunroof: false,
    //         USBPorts: false,
    //       },
    //       description: "",
    //       imageUrl: "",
    //       location: "",
    //       availability: true,
    //       createdAt: new Date(),
    //     },
    //   }
    // );

    //  Get all cars (optionally filter by user email)
    app.get("/cars", async (req, res) => {
      try {
        const email = req.query.email;
        const query = email ? { email } : {};
        const cars = await carCollection.find(query).toArray();
        res.send(cars);
      } catch (err) {
        res.status(500).send({ error: "Failed to fetch cars" });
      }
    });

    // Get a single car by ID
    app.get("/cars/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const car = await carCollection.findOne({ _id: new ObjectId(id) });
        if (!car) return res.status(404).send({ error: "Car not found" });
        res.send(car);
      } catch (err) {
        res.status(400).send({ error: "Invalid car ID" });
      }
    });

    //  Add a new car
    app.post("/cars", async (req, res) => {
      try {
        const newCar = req.body;
        newCar.createdAt = new Date();
        const result = await carCollection.insertOne(newCar);
        res.send(result);
      } catch (err) {
        res.status(400).send({ error: "Failed to add car" });
      }
    });

    //  Update a car by ID
    app.put("/cars/:id", async (req, res) => {
      const id = req.params.id;
      const updatedCar = req.body;
      try {
        const result = await carCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedCar }
        );
        if (result.matchedCount === 0) {
          return res.status(404).send({ error: "Car not found" });
        }
        res.send(result);
      } catch (err) {
        res.status(400).send({ error: "Invalid car ID" });
      }
    });

    //  Delete a car by ID
    app.delete("/cars/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const result = await carCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
          return res.status(404).send({ error: "Car not found" });
        }
        res.send(result);
      } catch (err) {
        res.status(400).send({ error: "Invalid car ID" });
      }
    });

    console.log("✅ Connected to MongoDB & API routes ready!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

run().catch(console.dir);

//  Root endpoint
app.get("/", (req, res) => res.send("🚗 Car Rental API is running..."));

//  Start server
app.listen(port, () =>
  console.log(`🚀 Server running at http://localhost:${port}`)
);
