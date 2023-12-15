import UserModel from "../user/user.model.js";

export default class ProductModel {
  constructor(name, desc, price, imageUrl, category, sizes, id) {
    (this.name = name),
      (this.desc = desc),
      (this.price = price),
      (this.imageUrl = imageUrl),
      (this.category = category),
      (this.sizes = sizes),
      (this._id = id);
  }

  static getAll() {
    return products;
  }

  static addProduct(newProduct) {
    const id = products.length + 1;
    const newEntry = { id, ...newProduct };
    console.log(newEntry);
    const result = products.push(newEntry);
    return result;
  }

  static getById(id) {
    const productFound = products.find((u) => u.id == id);
    return productFound;
  }

  static filter(minPrice, maxPrice, category) {
    const result = products.filter((product) => {
      return (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.category == category)
      );
    });
    return result;
  }

  static rateProduct(userID, productID, rating) {
    // 1. Validate user and product
    const user = UserModel.getAllUsers().find((u) => u.id == userID);
    if (!user) {
      throw new Error("User Not Found");
    }

    // Validate Product
    const product = products.find((p) => p.id == productID);
    if (!product) {
      throw new Error("Product Not Found");
    }

    // 2. Check if there are any ratings and if not then add ratings array.
    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({
        userID: userID,
        rating: rating,
      });
    } else {
      // 3. Check if user rating is already available.
      const existingRatingIndex = product.rating.findIndex(
        (r) => r.userID == userID
      );
      if (existingRatingIndex >= 0) {
        product.ratings[existingRatingIndex] = {
          userID: userID,
          rating: rating,
        };
      } else {
        // 4. if no exisitng rating, then add new rating.
        product.ratings.push({
          userID: userID,
          rating: rating,
        });
      }
    }
  }
}

export var products = [
  new ProductModel(
    1,
    "Product 1",
    "Atomic Book",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "cat11111"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Ikigai",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "cat22222",
    ["XL", "XXL"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Deep Work",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "cat33333",
    ["S", "M"]
  ),
];
