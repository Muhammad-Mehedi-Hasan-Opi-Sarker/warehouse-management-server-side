const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
let cors =require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swwzk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('warehouse connected');
  // perform actions on the collection object
  client.close();
});


app.get('/', (req, res) => {
  res.send('server running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})