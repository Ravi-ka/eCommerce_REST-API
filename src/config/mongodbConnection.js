import { MongoClient } from "mongodb";

// Connection URL
//const url = process.env.DB_URL;

let client;
export const connectToMongoDB = () => {
  MongoClient.connect(process.env.DB_URL)
    .then((clientInstance) => {
      client = clientInstance;
      console.log(`Connected to MongoDB Server - ${process.env.DB_URL}`);
      console.log("==================================");
      createIndexes(client.db());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDB = () => {
  return client.db();
};

const createIndexes = async (db) => {
  try {
    await db.collection("products").createIndex({ price: 1 });
    await db.collection("products").createIndex({ name: 1, category: -1 });
    await db.collection("products").createIndex({ desc: "text" });
  } catch (error) {
    console.log(error);
  }
  console.log("Indexes are created");
};
/* Connect to MongoDB using async/await
const connectToMongoDB = async () => {
  try {
    await MongoClient.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
*/

// ! Call this function on the server.js file, while connection to the Node.js server
