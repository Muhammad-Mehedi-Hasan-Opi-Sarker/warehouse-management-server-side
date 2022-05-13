const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
let cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleware 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swwzk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    await client.connect();
    console.log('opi')
    const productsCollection = client.db('newWarehouse').collection('productsofWarehouse');
    app.get('/product', async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
    // get for one item 
    app.get('/product/:id',async(req ,res)=>{
      const id = req.params.id;
      const query = {_id:ObjectId(id)};
      const product = await productsCollection.findOne(query);
      res.send(product);
    });
    // get post 
    app.post('/product', async(req,res)=>{
      const newProduct =req.body;
      const result = await productsCollection.insertOne(newProduct);
      res.send(result);
    });
    // DELETE 
    app.delete('/product/:id',async(req,res)=>{
      const id = req.params.id;
      const query ={_id: ObjectId(id)};
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });
  }
  finally {

  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('server running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})