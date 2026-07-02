import express from "express";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from "../controller/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMidddleware.js";
import  formidable from 'express-formidable';
import { deleteModel } from "mongoose";
import { productFiltersController } from "../controller/productController.js";
import { productCategoryController } from "../controller/productController.js";
const router = express.Router();

// create product route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.get("/get-product", getProductController);

// GET SINGLE PRODUCT
router.get("/get-product/:slug", getSingleProductController);

// GET PHOTO
router.get("/product-photo/:pid", productPhotoController);

// DELETE PRODUCT
router.delete(
  "/delete-product/:pid",
 
  deleteProductController
);

// UPDATE PRODUCT
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
router.post("/product-filters", productFiltersController);
router.get("/product-category/:slug", productCategoryController);
export default router;