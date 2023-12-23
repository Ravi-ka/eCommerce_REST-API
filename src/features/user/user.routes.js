import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

const UserRouter = express.Router();

const userController = new UserController();

UserRouter.post("/signin", (req, res) => {
  userController.signIn(req, res);
});
UserRouter.post("/signup", (req, res) => {
  userController.signUp(req, res);
});
UserRouter.put("/resetPassword", jwtAuth, (req, res) => {
  userController.resetPassword(req, res);
}); //jwtAuth middleware is applied specially to this endpoint

export default UserRouter;
