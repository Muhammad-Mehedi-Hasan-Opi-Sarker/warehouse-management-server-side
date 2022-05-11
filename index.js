const express = require('express');
let cors =require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('server running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})