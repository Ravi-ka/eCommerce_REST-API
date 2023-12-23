import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import ApplicationError from "../../error-handler/applicationError.js";

const UserModel = mongoose.model("users", userSchema);

export default class UserRepository {
  async signUp(user) {
    try {
      // create instance of the model
      const newUser = new UserModel(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wong with database", 500);
    }
  }

  async signIn(email, password) {
    try {
      return await UserModel.findOne({ email, password });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async passwordReset(userID, hashedPassword) {
    try {
      const user = await UserModel.findById(userID);
      if (user) {
        user.password = hashedPassword;
      }
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
