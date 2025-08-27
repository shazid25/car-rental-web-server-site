// const express =  require('express');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 3000;
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require('dotenv').config();


// // Middleware

// app.use(cors());
// app.use(express.json());



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@omicronx.oj2lwua.mongodb.net/?retryWrites=true&w=majority&appName=OmicronX`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();




//     const carCollection = client.db('carRent').collection('cars');
    
//     //cars api
//     app.get('/cars', async(req, res) =>{
//         const cursor = carCollection.find();
//         const result = await cursor.toArray();
//         res.send(result);
//     });


//     app.get('/cars/:id', async(req, res) =>{
//         const id = req.params.id;
//         const query = { _id: new ObjectId(id) };
//         const result = await carCollection.findOne(query);
//         res.send(result);
//     })


    

    

//     app.post('/cars', async(req, res) =>{
//       const newCar = req.body;
//       console.log('adding new car', newCar);
//       const result = await carCollection.insertOne(newCar);
//       res.send(result);

//     });


//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);




// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });




const express =  require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


// Middleware

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@omicronx.oj2lwua.mongodb.net/?retryWrites=true&w=majority&appName=OmicronX`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();




    const carCollection = client.db('carRent').collection('cars');
    
    //cars api
    app.get('/cars', async(req, res) =>{
        const cursor = carCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    });


    app.get('/cars/:id', async(req, res) =>{
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await carCollection.findOne(query);
        res.send(result);
    })


    

    

    app.post('/cars', async(req, res) =>{
      const newCar = req.body;
      console.log('adding new car', newCar);
      const result = await carCollection.insertOne(newCar);
      res.send(result);

    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

