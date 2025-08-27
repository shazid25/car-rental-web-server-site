// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 3000;
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require('dotenv').config();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@omicronx.oj2lwua.mongodb.net/?retryWrites=true&w=majority&appName=OmicronX`;
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     await client.connect();
//     const carCollection = client.db('carRent').collection('cars');

//     // Ensure old cars have default fields
//     await carCollection.updateMany(
//       { features: { $exists: false } },
//       {
//         $set: {
//           features: {
//             GPS: false,
//             AC: false,
//             Bluetooth: false,
//             HeatedSeats: false,
//             Sunroof: false,
//             USBPorts: false,
//           },
//           description: "",
//           imageUrl: "",
//           location: "",
//           availability: true,
//           createdAt: new Date(),
//         },
//       }
//     );

//     // Get all cars
//     app.get('/cars', async (req, res) => {
//       const email = req.query.email;
//       const query = email ? { email } : {};
//       const cars = await carCollection.find(query).toArray();
//       res.send(cars);
//     });

//     // Get car by ID
//     app.get('/cars/:id', async (req, res) => {
//       const id = req.params.id;
//       let car;
//       try {
//         car = await carCollection.findOne({ _id: new ObjectId(id) });
//       } catch (err) {
//         return res.send({ error: "Invalid car ID" });
//       }
//       if (!car) return res.send({ error: "Car not found" });
//       res.send(car);
//     });

//     // Add new car
//     app.post('/cars', async (req, res) => {
//       const newCar = req.body;
//       newCar.createdAt = new Date();
//       const result = await carCollection.insertOne(newCar);
//       res.send(result);
//     });

//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected to MongoDB!");
//   } finally {
//     // Do not close client to keep API running
//   }
// }

// run().catch(console.dir);

// app.get('/', (req, res) => res.send('Hello World!'));
// app.listen(port, () => console.log(`Server running on port ${port}`));











const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@omicronx.oj2lwua.mongodb.net/?retryWrites=true&w=majority&appName=OmicronX`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const carCollection = client.db('carRent').collection('cars');

    // Ensure old cars have default fields
    await carCollection.updateMany(
      { features: { $exists: false } },
      {
        $set: {
          features: {
            GPS: false,
            AC: false,
            Bluetooth: false,
            HeatedSeats: false,
            Sunroof: false,
            USBPorts: false,
          },
          description: "",
          imageUrl: "",
          location: "",
          availability: true,
          createdAt: new Date(),
        },
      }
    );

    // Get all cars
    app.get('/cars', async (req, res) => {
      const email = req.query.email;
      const query = email ? { email } : {};
      const cars = await carCollection.find(query).toArray();
      res.send(cars);
    });

    // Get car by ID
    app.get('/cars/:id', async (req, res) => {
      const id = req.params.id;
      let car;
      try {
        car = await carCollection.findOne({ _id: new ObjectId(id) });
      } catch (err) {
        return res.send({ error: "Invalid car ID" });
      }
      if (!car) return res.send({ error: "Car not found" });
      res.send(car);
    });

    // Add new car
    app.post('/cars', async (req, res) => {
      const newCar = req.body;
      newCar.createdAt = new Date();
      const result = await carCollection.insertOne(newCar);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } finally {
    // Do not close client to keep API running
  }
}

run().catch(console.dir);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server running on port ${port}`));
