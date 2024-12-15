// controllers/productController.js
import Product from '../models/product.js'
import { errorHandler } from '../utils/index.js';
import { isValidObjectId } from "mongoose";


export const addProduct = async (req, res, next) => {
  try {
    const { title, description, price, size, color, image } = req.body;

    // Check if all required fields are provided
    if (!title || !description || !price || !size || !color || !image) {
      return next(errorHandler(400, "All fields are required"));
    }

    // Create a new product
    const newProduct = new Product({
      title,
      description,
      price,
      size,
      color,
      image,
    });

    // Save the product to the database
    await newProduct.save();

    // Respond with success message and the new product
    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming the user ID is in the request object
    const { productId } = req.params; // Get the product ID from the URL parameters

    // Validate the product ID
    if (!productId || !isValidObjectId(productId)) {
      return next(
        errorHandler(
          400,
          productId ? "Product ID is invalid" : "Product ID is required"
        )
      );
    }

    // Find and delete the product by its ID and userId (for authorization)
    const deletedProduct = await Product.findOneAndDelete({
      _id: productId,
      userId, // Ensure the product belongs to the logged-in user
    });

    // If no product is found or not accessible by the user, return an error
    if (!deletedProduct) {
      return next(
        errorHandler(
          404,
          "Product not found or not authorized to delete this product"
        )
      );
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    // Validate the product ID
    if (!productId || !isValidObjectId(productId)) {
      return next(
        errorHandler(
          400,
          productId ? "Product id is invalid" : "Product id is required"
        )
      );
    }

    const { title, description, price, size, color, image } = req.body;

    // Validate required fields
    if (!title || !description || !price || !size || !color || !image) {
      return next(errorHandler(400, "All fields are required"));
    }

    // Find and update the product
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { title, description, price, size, color, image },
      { new: true, runValidators: true } // Ensure the updated product is returned
    );

    if (!updatedProduct) {
      return next(
        errorHandler(
          404,
          "Product not found or not authorized to update this product"
        )
      );
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllProducts = async (req, res, next) => {
  try {
    // Fetch all products and sort them by creation date (optional)
    const products = await Product.find().sort({ createdAt: -1 });

    // If no products are found, return an error message
    if (!products || products.length === 0) {
      return next(errorHandler(404, "No products found"));
    }

    // Send success response with products and additional information
    return res.status(200).json({
      success: true,
      products,
      message: "Products retrieved successfully",
      totalProducts: products.length,
    });
  } catch (error) {
    // Log the error and send a 500 response if something goes wrong
    console.error("Error getting products", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export default { addProduct, deleteProduct, updateProduct,getAllProducts };
