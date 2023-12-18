import express from "express";
import CartController from "./cartItem.controller.js";

const CartRouter = express.Router();
const cartController = new CartController();

CartRouter.post("/", (req, res) => {
  cartController.addItemToCart(req, res);
});
CartRouter.get("/", (req, res) => {
  cartController.getCartItemByID(req, res);
});
CartRouter.delete("/:id", (req, res) => {
  cartController.deleteCartItemByID(req, res);
});

export default CartRouter;
