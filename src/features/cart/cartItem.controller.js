import CartItemModel from "./cartItem.model.js";
import ProductModel from "../product/product.model.js";
import UserModel from "../user/user.model.js";
import CartItemsRepository from "./cartItem.repository.js";

export default class CartController {
  constructor() {
    this.cartItemsRepository = new CartItemsRepository();
  }
  async addItemToCart(req, res) {
    try {
      const { productID, quantity } = req.body;
      const userID = req.userID;
      const result = await this.cartItemsRepository.addItem(
        userID,
        productID,
        quantity
      );
      if (result) return res.status(201).send("Item added to cart");
      else
        return res
          .status(200)
          .send("Something went wrong while adding item to the cart");
    } catch (error) {
      console.log(error);
      return res.status(200).send("Something went wrong");
    }
  }

  async getCartItemByID(req, res) {
    try {
      const userID = req.userID;
      const result = await this.cartItemsRepository.getItem(userID);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res.status(200).send("Something went wrong");
    }
  }

  async deleteCartItemByID(req, res) {
    try {
      const productID = req.params.id;
      const userID = req.userID;
      const isDeleted = await this.cartItemsRepository.deleteItem(
        userID,
        productID
      );
      if (isDeleted) return res.status(200).send("Cart item removed");
      else return res.status(500).send("Cart Item not found");
    } catch (error) {
      console.log(error);
      return res.status(200).send("Something went wrong");
    }
  }
}
