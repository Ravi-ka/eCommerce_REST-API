// ! Managing routes/paths to ProductController
import express from "express";
import {upload} from '../../middlewares/fileupload.middleware.js'


import ProductController from "./product.controller.js";

const ProductRouter = express.Router();

const productController = new ProductController();

ProductRouter.get('/getAllProducts',productController.getAllProducts)
ProductRouter.get('/get/:id',productController.getProductById)
ProductRouter.post('/addProduct',upload.single('imageUrl'),productController.addNewProduct)
ProductRouter.get('/filter',productController.filterProducts)






export default ProductRouter;