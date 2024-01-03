import mongoose, { model } from "mongoose";
import dotenv from "dotenv";
import { CategorySchema } from "../features/product/category.schema.js";

dotenv.config();
const url = process.env.DB_URL;
export default async function connectToMongoose() {
  try {
    await mongoose.connect(url);
    console.log(`Connected to MongoDB server using Mongoose on ${url}`);
    console.log("==================================");
    addCategories();
  } catch (error) {
    console.log(error);
    console.log("Error while connection to Mongoose");
  }
}

async function addCategories() {
  try {
    const CategoryModel = mongoose.model("category", CategorySchema);
    const categories = CategoryModel.find();
    if (!categories || (await categories).length == 0) {
      await CategoryModel.insertMany([
        { name: "Books" },
        { name: "Clothings" },
        { name: "Electronics" },
      ]);
    }
    console.log("categories has been added");
  } catch (error) {
    console.log("Category Schema Error: " + error);
  }
}
