import { MongoClient } from "mongodb";

// Connection URL
const url = "mongodb://127.0.0.1:27017/eCommerceDB";

const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((client) => {
      console.log(`Connected to MongoDB Server - ${url}`);
      console.log("==================================");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectToMongoDB;
// ! Call this function on the server.js file, while connection to the Node.js server
