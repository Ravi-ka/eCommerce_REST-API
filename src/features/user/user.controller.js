import jwt from "jsonwebtoken";

import UserModel from "./user.model.js";
import ApplicationError from "../../error-handler/applicationError.js";

export default class UserController {
  async signUp(req, res) {
    try {
      const { name, email, password, userType } = req.body;
      const newUser = await UserModel.SignUp(name, email, password, userType);
      res.status(201).send(newUser);
    } catch (error) {
      // throw new ApplicationError("Something went wrong",500)
      console.log(error);
    }
  }

  signIn(req, res) {
    const { email, password } = req.body;
    const checkUser = UserModel.SignIn(email, password);
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
  }
}
