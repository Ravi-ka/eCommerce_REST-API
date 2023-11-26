// ! Managing routes/paths to ProductController
import express from "express";

import ProductController from "./product.controller.js";

const ProductRouter = express.Router();

const productController = new ProductController();

ProductRouter.get('/getAllProducts',productController.getAllProducts)
ProductRouter.post('/addProduct',productController.addNewProduct)






export default ProductRouter;