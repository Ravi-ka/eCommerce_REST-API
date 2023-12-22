import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodbConnection.js";
import ApplicationError from "../../error-handler/applicationError.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    try {
      const db = getDB();
      //  1. Get cart items and calculate total amount
      const items = await this.getTotalAmount(userId);
      const finalTotalAmount = items.reduce((acc, item) => {
        acc + item.totalAmount;
      }, 0);
      console.log(finalTotalAmount);
      // 2. Create an order record
      const newOrder = new OrderModel(
        new ObjectId(userId),
        finalTotalAmount,
        newDate()
      );
      await db.collection(this.collection).insertOne(newOrder);
      // 3. Reduce the stock

      // 4. Clear the cart items
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getTotalAmount(userId) {
    try {
      const db = getDB();
      const items = await db
        .collection("cartItems")
        .aggregate([
          // 1. Get cart items of the user
          {
            $match: { userId: new ObjectId(userId) },
          },
          // 2. Get the products from the products collection
          {
            $lookup: {
              from: "products",
              localField: "productID",
              foreignField: "_id",
              as: "productInfo",
            },
          },
          //   3. Unwind the productInfo
          {
            $unwind: "$productInfo",
          },
          //   4. Calculate total amount for each cartItems
          {
            $addFields: {
              "totalAmount": { $multiply: ["$productInfo.price", "$quantity"] },
            },
          },
        ])
        .toArray();
      return items;
    } catch (error) {}
  }
}
