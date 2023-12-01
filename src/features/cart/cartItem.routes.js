import express from "express";
import CartController from "./cartItem.controller.js";

const CartRouter = express.Router();
const cartController = new CartController();

CartRouter.post("/", cartController.addItemToCart);
CartRouter.get("/:id", cartController.getCartItemByID);
CartRouter.delete("/:id", cartController.deleteCartItemByID);

export default CartRouter;
