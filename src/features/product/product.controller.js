import ProductModel from "./product.model.js";
import { products } from "./product.model.js";

export default class ProductController{

    getAllProducts(req, res){
        const productList = ProductModel.getAll();
        res.status(200).send(productList)
    }

    getProductById(req, res){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(productFound){
            res.status(200).send(productFound)
        }
        else res.status(404).send("Product Not Found")
    }

    addNewProduct(req, res){
        const {name, price, sizes,category} = req.body;
        const newProduct = {
            name, 
            price:parseFloat(price), 
            imageUrl: req.file.filename,
            category,
            size:sizes.split(','),
            
        }
        const result = ProductModel.addProduct(newProduct);
        if(result){
            res.status(201).send(products)
        }
        else res.send('Something went wrong while adding the product')
    }



}