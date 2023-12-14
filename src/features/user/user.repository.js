import { getDB } from "../../config/mongodbConnection.js";
import ApplicationError from "../../error-handler/applicationError.js";

export class UserRepository {
  async signUp(newUser) {
    try {
      const db = getDB();
      const collection = db.collection("users");
      await collection.insertOne(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async signIn(email, password) {
    try {
      const db = getDB();
      const collection = db.collection("users");
      const result = await collection.findOne({ email, password });
      return result;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
