import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.DB_URL;
export default async function connectToMongoose() {
  try {
    await mongoose.connect(url);
    console.log(`Connected to MongoDB server using Mongoose on ${url}`);
    console.log("==================================");
  } catch (error) {
    console.log(error);
    console.log("Error while connection to Mongoose");
  }
}
