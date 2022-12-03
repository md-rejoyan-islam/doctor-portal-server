const express=require('express')
const app=express()
const dotenv=require('dotenv').config()
const cors=require('cors')

const port =process.env.PORT || 5002


app.use(express.json())

app.use(cors())

app.get('/',(req,res)=>{
    res.send('hello')
})
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.37oivsc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const appointment = client.db("doctorsPortal").collection("appointmentCollection");
    const bookingCollection = client.db("booking").collection("bookingCollection");
    // const appointment2 = client.db("photoGraphy1").collection("skill2");
    // const appointment3 = client.db("photoGraph1").collection("review2");

    // app.get("/products", async (req, res) => {
    //   const query = {};
    //   const cursor = appointment2.find(query);
    //   const users = await cursor.toArray();
    //   res.send(users);
    // });
    app.get("/appointmentCollection", async (req, res) => {
      const date = req.query.date;
      console.log(date);
      const query = {};
      const cursor = appointment.find(query);
      const options= await cursor.toArray();
      const bookingQuery = { appointmentDate :date};
      const alreadyBooked=await bookingCollection.find(bookingQuery).toArray()
   
      options.forEach(option=>{
        const optionBooked=alreadyBooked.filter(book=>book.treatment ==  option.name)
        const bookSlots=optionBooked.map(booked=>booked.slot)
        const remainSlots=option.slot.filter(slot=> !bookSlots.includes(slot) )
        option.slot=remainSlots
      })
      res.send(options);
    });

    app.post("/appointmentCollection", async (req, res) => {
      const user = req.body;
      const result = await appointment.insertOne(user);
      console.log(result);
      res.send(result);
    });


    app.get("/bookingCollection", async (req, res) => {
      
      const query = {};
      const cursor = bookingCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    app.post("/bookingCollection", async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      console.log(result);
      res.send(result);
    });

    
    //search by band
    app.post("/productsByBand", async (req, res) => {
      const user = req.body.band;
      let query = {};
      if (user) {
        query = { band: user };
      }
      const cursor = appointment.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    //search by price
    app.post("/productsByPrice", async (req, res) => {
      const price = req.body.price;
      const query = { price: { $lte: price } };

      const cursor = appointment.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // app.post("/skills", async (req, res) => {
    //   const user = req.body;
    //   const result = await appointment2.insertMany(user);
    //   console.log(result);
    //   res.send(result);
    // });

    app.delete("/products/:id", async (req, res) => {
      const userId = req.params.id;
      const query = { _id: ObjectId(userId) };
      const result = await appointment.deleteOne(query);
      res.send(result);
    });

    app.get("/products/:id", async (req, res) => {
      const userId = req.params.id;
      const query = { _id: ObjectId(userId) };
      const user = await appointment.findOne(query);
      res.send(user);
    });
    //  app.get("/review", async (req, res) => {
    //    const query = {};
    //    const cursor = appointment3.find(query);
    //    const users = await cursor.toArray();
    //    res.send(users);
    //  });

    //     app.get("/review/:id", async (req, res) => {
    // const userId = req.params.id;
    //  const query2 = {};
    // const query = { id : userId };
    // const cursor = appointment3.find(query);
    // const users = await cursor.toArray();
    // res.send(users);

    //     }
    //     );
    // app.post("/review", async (req, res) => {
    //     const user = req.body;
    //     const result = await appointment3.insertOne(user);
    //     console.log(result);
    //     res.send(result);
    // });

    // app.put("/services/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: ObjectId(id) };
    //   const user = req.body;
    //   console.log(user);
    //   const option = { upsert: true };
    //   const updateUser = {
    //     $set: {
    //       name: user.name,
    //       email: user.email,
    //     },
    //   };
    //   const result = await appointment.updateOne(filter, updateUser, option);
    //   console.log(result);
    // });

    // create a document to insert

    // const result = await userData.insertOne(user);

    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})
