import express from "express";
import bodyParser from "body-parser";

import ProductRouter from "./src/features/product/product.routes.js";
import UserRouter from "./src/features/user/user.routes.js";
import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";

const server = express();
const port = 4000;

server.use(bodyParser.urlencoded({
    extended: true
}))
server.use(bodyParser.json())


// Default Routes
server.get('/',(req, res)=>{
    res.send('<center><h2>Welcome to the eCommerce REST API</h2></center>')
})

// Products Route
server.use('/api/products',basicAuthorizer,ProductRouter)
// User Routes
server.use('/api/user',UserRouter)


// Listening Port
server.listen(port,(err)=>{
    if(err)
        console.log(err)
    else
        console.log(`Server is running on port ${port}`)
})