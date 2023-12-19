import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodbConnection.js";
import ApplicationError from "../../error-handler/applicationError.js";

export default class CartItemsRepository {
  constructor() {
    this.collection = "cartItems";
  }
  async addItem(userID, productID, quantity) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      const result = await collection.updateOne(
        {
          userID: new ObjectId(userID),
          productID: new ObjectId(productID),
        },
        { $inc: { quantity: quantity } },
        { upsert: true }
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getItem(userID) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection
        .find({ userID: new ObjectId(userID) })
        .toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async deleteItem(userID, productID) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.deleteOne({
        userID: new ObjectId(userID),
        productID: new ObjectId(productID),
      });
      return result.deletedCount > 0;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
