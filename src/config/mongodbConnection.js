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
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDB = () => {
  return client.db();
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
