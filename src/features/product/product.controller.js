import ProductModel from "./product.model.js";
import { products } from "./product.model.js";

export default class ProductController{

    getAllProducts(req, res){
        const productList = ProductModel.getAll();
        res.status(200).send(productList)
    }

    addNewProduct(req, res){
        const newProduct = req.body;
        const result = ProductModel.addProduct(newProduct);
        if(result){
            res.status(201).send(products)
        }
        else res.send('Something went wrong while adding the product')
    }



}