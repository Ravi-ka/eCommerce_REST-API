import CartItemModel from "./cartItem.model.js";
import ProductModel from "../product/product.model.js";
import UserModel from "../user/user.model.js";

export default class CartController {
  addItemToCart(req, res) {
    console.log(req);
    const { productID, quantity } = req.query;
    const userID = req.userID;
    const product = ProductModel.getAll().find((p) => p.id == productID);
    if (!product) return res.status(400).send("Product Not Found");
    const user = UserModel.getAllUsers().find((u) => u.id == userID);
    if (!user) return res.status(400).send("User Not Found");
    const cartItem = CartItemModel.addItems(userID, productID, quantity);
    res.status(201).send(cartItem);
  }

  getCartItemByID(req, res) {
    const userID = req.params.id;
    const result = CartItemModel.getCartByID(userID);
    res.status(200).send(result);
  }

  deleteCartItemByID(req, res) {
    const cartId = req.params.id;
    const userID = req.userID;
    const checkUser = UserModel.getAllUsers().find((u) => u.id == userID);
    if (!checkUser) {
      return res.status(400).send("User Not Found");
    }
    const error = CartItemModel.deleteCartByID(cartId);
    if (!error) {
      return res.status(200).send("Cart item deleted");
    } else {
      return res.status(404).send("Item not found");
    }
  }
}
