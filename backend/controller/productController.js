import productModel from "../models/productmodel.js";
import slugify from "slugify";
import fs from "fs";
import categoryModel from "../models/categorymodel.js";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is Required" });
      case !description:
        return res.status(400).send({ error: "Description is Required" });
      case !price:
        return res.status(400).send({ error: "Price is Required" });
      case !category:
        return res.status(400).send({ error: "Category is Required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(400)
          .send({ error: "Photo should be less than 1MB" });
    }

    // Create product
    const products = new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    // Save photo in DB (Buffer type)
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};
export const getProductController = async (req, res) => {
    try {
      const products = await productModel
        .find({})
        .select("-photo")
        .populate("category")
        .limit(12)
        .sort({ createdAt: -1 });
  
      res.status(200).send({
        success: true,
        countTotal: products.length,
        message: "All Products",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in getting products",
        error,
      });
    }
  };
  
  // ===============================
  // GET SINGLE PRODUCT
  // ===============================
  export const getSingleProductController = async (req, res) => {
    try {
      const product = await productModel
        .findOne({slug:req.params.slug})
        .select("-photo")
        .populate("category");
  
      res.status(200).send({
        success: true,
        message: "Single Product Fetched",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting single product",
        error,
      });
    }
  };
  
  // ===============================
  // GET PRODUCT PHOTO
  // ===============================
  export const productPhotoController = async (req, res) => {
    try {
      const product = await productModel
        .findById(req.params.pid)
        .select("photo");
  
      if (product.photo.data) {
        res.set('Content-type', product.photo.contentType);
        return res.status(200).send(product.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting photo",
        error,
      });
    }
  };
  
  // ===============================
  // DELETE PRODUCT
  // ===============================
  export const deleteProductController = async (req, res) => {
    try {
      await productModel.findByIdAndDelete(req.params.pid).select("-photo");
  
      res.status(200).send({
        success: true,
        message: "Product Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting product",
        error,
      });
    }
  };
  
  // ===============================
  // UPDATE PRODUCT
  // ===============================
  export const updateProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
  
      // Validation
      switch (true) {
        case !name:
          return res.status(400).send({ error: "Name is Required" });
        case !description:
          return res.status(400).send({ error: "Description is Required" });
        case !price:
          return res.status(400).send({ error: "Price is Required" });
        case !category:
          return res.status(400).send({ error: "Category is Required" });
        case !quantity:
          return res.status(400).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(400)
            .send({ error: "Photo should be less than 1MB" });
      }
  
      const product = await productModel.findByIdAndUpdate(
        req.params.pid,
        {
          ...req.fields,
          slug: slugify(name),
        },
        { new: true }
      );
  
      // If new photo uploaded
      if (photo) {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
      }
  
      await product.save();
  
      res.status(200).send({
        success: true,
        message: "Product Updated Successfully",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while updating product",
        error,
      });
    }
  };
  export const productFiltersController = async (req, res) => {
    try {
      const { checked, price, sort, keyword, page = 1 } = req.body;
  
      let args = {};
  
      // CATEGORY
      if (checked && checked.length > 0) {
        args.category = { $in: checked };
      }
  
      // PRICE
      if (price && price.length === 2) {
        args.price = {
          $gte: price[0],
          $lte: price[1],
        };
      }
  
      // SEARCH
      if (keyword) {
        args.name = { $regex: keyword, $options: "i" };
      }
  
      // SORTING
      let sortOption = {};
      if (sort === "low") sortOption.price = 1;
      if (sort === "high") sortOption.price = -1;
  
      const limit = 8;
      const skip = (page - 1) * limit;
  
      const products = await productModel
        .find(args)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .select("-photo")
        .populate("category");
  
      const total = await productModel.countDocuments(args);
  
      res.status(200).send({
        success: true,
        products,
        total,
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Filter error",
      });
    }
  };


  export const productCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({
        slug: req.params.slug,
      });
  
      // ✅ SAFETY CHECK
      if (!category) {
        return res.status(404).send({
          success: false,
          message: "Category not found",
        });
      }
  
      // ✅ USE productModel (your import)
      const products = await productModel
        .find({ category: category._id })
        .select("-photo")
        .populate("category");
  
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting category products",
        error,
      });
    }
  };