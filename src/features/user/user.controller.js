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

  async resetPassword(req, res) {
    try {
      const userID = req.userID;
      const { newPassword } = req.body;
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await this.userRepository.passwordReset(userID, hashedPassword);
      return res.status(200).send("New password has been updated");
    } catch (error) {
      console.log(error);
      return res.status(200).send("Something went wrong");
    }
  }
  async signUp(req, res) {
    try {
      const { name, email, password, userType } = req.body;
      //const hashedPassword = await bcrypt.hash(password, 12);
      const user = { name, email, password, userType };
      // const newUser = new UserModel(user);
      //console.log(newUser);
      //const newUser = new UserModel(user);
      await this.userRepository.signUp(user);
      res.status(201).json({ "message": "User created", "user": user });
    } catch (error) {
      console.log(error);
      res.send(error.message);
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
