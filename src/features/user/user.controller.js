import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "./user.model.js";
import ApplicationError from "../../error-handler/applicationError.js";
import { UserRepository } from "./user.repository.js";
import { logger } from "../../middlewares/logger.middleware.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, userType } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new UserModel(name, email, hashedPassword, userType);
      await this.userRepository.signUp(newUser);
      res.status(201).send(newUser);
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async signIn(req, res) {
    try {
      // 1. Find user by email
      const checkUserEmail = await this.userRepository.findByEmail(
        req.body.email
      );
      // console.log(checkUserEmail);
      if (!checkUserEmail) {
        return res.status(400).send("User Not Found or Incorrect Credentials");
      } else {
        // 2. Compare the user password with hashedPassword
        const checkUserPassword = await bcrypt.compare(
          req.body.password,
          checkUserEmail.password
        );
        if (checkUserPassword) {
          // 3. If both email and password are correct, then create the JWT token
          const token = jwt.sign(
            {
              userID: checkUserPassword.id,
              email: checkUserPassword.email,
            },
            "xfv1jbNKTc4hbPUS9OXPBQ30iVlmqA4T",
            {
              algorithm: "HS256",
              expiresIn: "1h",
            }
          );
          res.status(200).send(token);
        } else {
          //If password is not matching, this else block will be executed
          return res
            .status(400)
            .send("User Not Found or Incorrect Credentials");
        }
      }
    } catch (error) {
      console.log(error);
      logger.error(error);
      return res.status(200).send("Something went wrong");
    }
  }
}
