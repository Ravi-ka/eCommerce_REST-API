import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import ProductRouter from "./src/features/product/product.routes.js";
import UserRouter from "./src/features/user/user.routes.js";
import CartRouter from "./src/features/cart/cartItem.routes.js";
import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";

const server = express();
const port = 4000;

// CORS Policy Configuration
const corsOptions = {
  origin: "http://127.0.0.1:5500",
};
server.use(cors(corsOptions));
/*
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  // Return '200' for the preflight request
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
*/

server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(bodyParser.json());

// Default Routes
server.get("/", (req, res) => {
  res.send("<center><h2>Welcome to the eCommerce REST API</h2></center>");
});

// Products Route
server.use("/api/products", jwtAuth, ProductRouter);
// User Routes
server.use("/api/user", UserRouter);
// CartItem Routes
server.use("/api/cart", jwtAuth, CartRouter);

// Handling 404 requests
server.use("*", (req, res) => {
  res
    .status(404)
    .send(
      `The requested path ${req.originalUrl} is not found. Please check our documentation for more information.`
    );
});

// Listening Port
server.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server is running on port ${port}`);
});
