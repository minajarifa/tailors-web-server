const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

const port = process.env.PORT || 9000;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Use CORS middleware
app.use(cors());
app.use(express.json());

// console.log(process.env.DB_USER);

const uri = `mongodb+srv://Arifa:OA1Nu6SUouEyzZYM@cluster0.63qrdth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const userCollection = client.db("tailors").collection("users");
    const productCollection = client.db("tailors").collection("products");

    app.get("/products", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });
    app.get("/users", async (req, res) => {
      const result = await productCollection.find().toArray();
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
