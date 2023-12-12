import { MongoClient } from "mongodb";

// Connection URL
const url = "mongodb://127.0.0.1:27017/eCommerceDB";

let client;
export const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log(`Connected to MongoDB Server - ${url}`);
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
