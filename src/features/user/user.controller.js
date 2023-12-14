import jwt from "jsonwebtoken";

import UserModel from "./user.model.js";
import ApplicationError from "../../error-handler/applicationError.js";
import { UserRepository } from "./user.repository.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, userType } = req.body;
      const newUser = new UserModel(name, email, password, userType);
      await this.userRepository.signUp(newUser);
      res.status(201).send(newUser);
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
      console.log(error);
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const checkUser = await this.userRepository.signIn(email, password);
      console.log(checkUser);
      if (!checkUser)
        return res.status(400).send("User Not Found or Incorrect Credentials");
      else {
        const token = jwt.sign(
          {
            userID: checkUser.id,
            email: checkUser.email,
          },
          "xfv1jbNKTc4hbPUS9OXPBQ30iVlmqA4T",
          {
            algorithm: "HS256",
            expiresIn: "1h",
          }
        );

        res.status(200).send(token);
      }
    } catch (error) {
      console.log(error);
      return res.status(200).send("Something went wrong");
    }
  }
}
