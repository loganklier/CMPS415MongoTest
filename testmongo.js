const { MongoClient } = require("mongodb");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.listen(port);
console.log("Server started at http://localhost:" + port);

// The uri string must be the connection string for the database (obtained on Atlas).
const uri =
  "mongodb+srv://classuser:cmps415class@ckmdb.5oxvqja.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

app.get("/", function (req, res) {
  async function run() {
    try {
      const database = client.db("ckmdb");
      const parts = database.collection("cmps415");

      // Query for a part that has partID '12345'
      const query = { partID: "12345" };
      const part = await parts.findOne(query);

      console.log(part);
      res.send(part);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
});

async function run() {
  try {
    const database = client.db("ckmdb");
    const parts = database.collection("cmps415");

    // Query for a part that has partID '12345'
    const query = { partID: "12345" };
    const part = await parts.findOne(query);

    console.log(part);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
