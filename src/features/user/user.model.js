import { getDB } from "../../config/mongodbConnection.js";
import ApplicationError from "../../error-handler/applicationError.js";

export default class UserModel {
  constructor(id, name, email, password, userType) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.userType = userType;
    this._id = id;
  }

  static async SignUp(name, email, password, userType) {
    try {
      // 1. Get the database
      const db = getDB();
      // 2.  Get the collection
      const collection = db.collection("users");
      const newUser = { name, email, password, userType };
      // 3. Insert the document
      await collection.insertOne(newUser);
      return newUser;
    } catch (error) {
      throw new ApplicationError(
        "Something went wrong while inserting into DB",
        500
      );
    }
  }

  static SignIn(email, password) {
    const checkUser = userData.find(
      (u) => u.email == email && u.password == password
    );
    return checkUser;
  }

  static getAllUsers() {
    return userData;
  }
}

let userData = [
  new UserModel(1, "Seller User", "seller@test.com", "testseller", "seller"),
  new UserModel(
    2,
    "Customer User",
    "customer@test.com",
    "testcustomer",
    "customer"
  ),
];
