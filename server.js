import express from "express";
import bodyParser from "body-parser";

import ProductRouter from "./src/features/product/product.routes.js";

const server = express();
const port = 4000;

server.use(bodyParser.urlencoded({
    extended: true
}))
server.use(bodyParser.json())

server.get('/',(req, res)=>{
    res.send('<center><h2>Welcome to the eCommerce REST API</h2></center>')
})
server.use('/api/products',ProductRouter)

server.listen(port,(err)=>{
    if(err)
        console.log(err)
    else
        console.log(`Server is running on port ${port}`)
})