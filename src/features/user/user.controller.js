import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "./user.model.js";
import ApplicationError from "../../error-handler/applicationError.js";
import UserRepository from "./user.repository.js";
import { logger } from "../../middlewares/logger.middleware.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, userType } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel(name, email, hashedPassword, userType);
      //const newUser = new UserModel(user);
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      // 1. Find user by email
      const checkUserEmail = await this.userRepository.findByEmail(email);
      if (!checkUserEmail) {
        return res.status(400).send("User Not Found or Incorrect Credentials");
      } else {
        // 2. Compare the user password with hashedPassword
        const passwordMatch = await bcrypt.compare(
          password,
          checkUserEmail.password
        );
        console.log(passwordMatch);
        if (passwordMatch) {
          // 3. If both email and password are correct, then create the JWT token
          const token = jwt.sign(
            {
              userID: checkUserEmail._id,
              email: checkUserEmail.email,
            },
            process.env.JWT_SECRET,
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
