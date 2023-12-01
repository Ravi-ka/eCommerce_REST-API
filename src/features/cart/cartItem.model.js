export default class CartItemModel {
  constructor(productID, userID, quantity, id) {
    (this.productID = productID),
      (this.userID = userID),
      (this.quantity = quantity),
      (this.id = id);
  }

  static addItems(userID, productID, quantity) {
    const newCartItem = new CartItemModel(productID, userID, quantity);
    newCartItem.id = cartItems.push(newCartItem);
    return newCartItem;
  }
  static getCartByID(userID) {
    const result = cartItems.filter((c) => c.userID == userID);
    return result;
  }

  static deleteCartByID(cartId) {
    const resultIndex = cartItems.findIndex((c) => c.id == cartId);
    if (resultIndex == -1) {
      return "Item not found in cart";
    } else {
      cartItems.splice(resultIndex, 1);
      return;
    }
  }
}

let cartItems = [new CartItemModel(1, 2, 1, 1)];
