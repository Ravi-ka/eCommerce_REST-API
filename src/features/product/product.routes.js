// ! Managing routes/paths to ProductController
import express from "express";
import { upload } from "../../middlewares/fileupload.middleware.js";

import ProductController from "./product.controller.js";

const ProductRouter = express.Router();

const productController = new ProductController();

ProductRouter.get("/getAllProducts", (req, res) => {
  productController.getAllProducts(req, res);
});
ProductRouter.get("/get/:id", (req, res) => {
  productController.getProductById(req, res);
});
ProductRouter.post("/addProduct", upload.single("imageUrl"), (req, res) => {
  productController.addNewProduct(req, res);
});
ProductRouter.get("/filter", (req, res) => {
  productController.filterProducts(req, res);
});
ProductRouter.post("/rate", (req, res) => {
  productController.rateProduct(req, res);
});
ProductRouter.get("/averagePrice", (req, res) => {
  productController.averagePrice(req, res);
});
export default ProductRouter;
