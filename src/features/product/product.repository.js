import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodbConnection.js";
import ApplicationError from "../../error-handler/applicationError.js";
import logger from "../../middlewares/logger.middleware.js";

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
}

export default ProductRepository;
