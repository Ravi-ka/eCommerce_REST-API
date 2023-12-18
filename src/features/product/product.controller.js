import ApplicationError from "../../error-handler/applicationError.js";
import { logger } from "../../middlewares/logger.middleware.js";
import ProductModel from "./product.model.js";
import { products } from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    try {
      const productList = await this.productRepository.getAll();
      return res.status(200).send(productList);
    } catch (error) {
      console.log(error);
      return res.status(200).send("Something went wrong");
    }
  }

  async getProductById(req, res) {
    try {
      const id = req.params.id;
      const productFound = await this.productRepository.getById(id);
      if (productFound) {
        return res.status(200).send(productFound);
      } else {
        return res.status(404).send("Product Not Found");
      }
    } catch (error) {
      console.log(error);
      return res.status(200).send("Something went wrong");
    }
  }

  async addNewProduct(req, res) {
    try {
      const { name, desc, price, sizes, category } = req.body;
      const newProduct = new ProductModel(
        name,
        desc,
        parseFloat(price),
        req.file.filename,
        category,
        sizes.split(",")
      );
      const newItem = await this.productRepository.addProduct(newProduct);
      if (newItem) {
        res.status(201).send(newProduct);
      } else res.send("Something went wrong while adding the product");
    } catch (error) {
      console.log(error);
      logger.error(error);
      return res.status(200).send("Something went wrong");
    }
  }

  async filterProducts(req, res) {
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;
      const result = await this.productRepository.filterProduct(
        minPrice,
        maxPrice,
        category
      );
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      logger.error(error);
      return res.status(200).send("Something went wrong");
    }
  }

  async rateProduct(req, res, next) {
    try {
      const userID = req.userID;
      const productID = req.body.productID;
      const rating = req.body.rating;

      await this.productRepository.rateProduct(userID, productID, rating);
      return res.status(200).send("Rating has been added");
    } catch (err) {
      console.log(err);
      console.log("Passing error to middleware");
      next(err);
    }
  }
}
