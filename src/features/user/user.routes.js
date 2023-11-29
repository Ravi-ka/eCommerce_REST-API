import  express from "express";
import UserController from "./user.controller.js";

const UserRouter = express.Router();

const userController = new UserController();

UserRouter.post('/signin',userController.signIn)
UserRouter.post('/signup',userController.signUp)



export default UserRouter;