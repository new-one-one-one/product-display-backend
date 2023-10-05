import * as fs from "fs";
import { logger } from "../utils/logger";
import { IProduct, products } from "../models/productModel";
import path from "path";

const dataFilePath = __dirname + "/../../data/products/list.json";

/**
 * @function loadProductsData
 *
 * This function load the product data one time on starting the
 * application.
 */

export const loadProductsData = () => {
  try {
    const rawData = fs.readFileSync(dataFilePath, "utf-8");
    const jsonData: Array<IProduct> = JSON.parse(rawData);
    products.push(...jsonData);
    logger.info("Product data loaded successfully.");
    logger.info(`Number of product records loaded ${products.length}`);
  } catch (error: any) {
    logger.error("Error loading product data:", error);
  }
};

export const saveProductData = (productData: any) => {
  logger.info(JSON.stringify(productData));
  try {
    const dataDir = __dirname + "/../../data";
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hour = now.getHours().toString().padStart(2, "0");
    const filePath = path.join(dataDir, year, month, day, `${hour}.json`);

    // Ensure the directories exist, or create them if they don't.
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    const jsonData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : [];
    jsonData.push(productData);

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    logger.info(`Product data saved to ${filePath}`);
  } catch (error: any) {
    logger.error("Error saving product data:", error);
  }
};
