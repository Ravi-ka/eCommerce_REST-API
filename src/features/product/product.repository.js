import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodbConnection.js";
import ApplicationError from "../../error-handler/applicationError.js";
import logger from "../../middlewares/logger.middleware.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";

const ProductModel = new mongoose.model("products", productSchema);
const ReviewModel = new mongoose.model("reviews", reviewSchema);
class ProductRepository {
  constructor() {
    this.collection = "products";
  }
  async addProduct(newProduct) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.insertOne(newProduct);
      return result;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new ApplicationError("something went wrong with database", 500);
    }
  }

  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const list = await collection.find().toArray();
      return list;
    } catch (error) {
      console.log("getAll() Method error: " + error);
      logger.error(error);
      throw new ApplicationError("something went wrong with database", 500);
    }
  }

  async getById(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ _id: new ObjectId(id) }); //! 'new' keyword must be used before the ObjectId.
    } catch (error) {
      console.log(error);
      throw new ApplicationError("something went wrong with database", 500);
    }
  }

  async filterProduct(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filteredExpression = {};
      if (minPrice) {
        filteredExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filteredExpression.price = {
          ...filteredExpression.price,
          $lte: parseFloat(maxPrice),
        };
      }
      if (category) {
        filteredExpression.category = category;
      }
      const result = await collection.find(filteredExpression).toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("something went wrong with database", 500);
    }
  }

  async rateProduct(userID, productID, rating) {
    try {
      // 1. Check if the product exists
      const checkProduct = await ProductModel.findById(productID);
      if (!checkProduct) {
        throw new Error("Product Not Found");
      }
      // 2. If the product is found, find the existing review
      const userReview = await ReviewModel.findOne({
        product: new ObjectId(productID),
        user: new ObjectId(userID),
      });
      if (userReview) {
        userReview.rating = rating;
        await userReview.save();
      } else {
        // Create a new review
        const newReview = await new ReviewModel({
          product: new ObjectId(productID),
          user: new ObjectId(userID),
          rating: rating,
        });
        await newReview.save();
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async averageProductPricePerCategory() {
    try {
      const db = getDB();
      const result = await db
        .collection(this.collection)
        .aggregate([
          { $group: { _id: "$category", averagePrice: { $avg: "$price" } } },
        ])
        .toArray();
      console.log(result);
      return result;
    } catch (error) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}

export default ProductRepository;
