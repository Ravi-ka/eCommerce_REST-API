import { getDB } from "../../config/mongodbConnection.js";
import ApplicationError from "../../error-handler/applicationError.js";

export default class UserModel {
  constructor(name, email, password, userType, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.userType = userType;
    this._id = id;
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
