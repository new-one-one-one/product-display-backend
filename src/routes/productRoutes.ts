import { saveProductData } from "../controllers/productController";
import { IProduct, products } from "../models/productModel";
import { logger } from "../utils/logger";

const express = require("express");

export const productRouter = express.Router();

productRouter.get("/products", (req: any, res: any) => {
  res.json(products);
});

productRouter.get("/products/:id", (req: any, res: any) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p: IProduct) => p.id === productId);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
  } else {
    res.json(product);
  }
});

productRouter.post("/product/purchase", (req: any, res: any) => {
  logger.info(req);
  console.log({ req });
  const productData: any = req.body;
  logger.info(req.body);
  saveProductData(productData);
  logger.info("Received product data");
  res.status(201).json({ message: "Product data saved successfully" });
});
