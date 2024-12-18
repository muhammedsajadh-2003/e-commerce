import Product from "../models/product.model.js";
import { errorHandler } from "../utils/index.js";
import { isValidObjectId } from "mongoose";
import Cart from "../models/cart.model.js";

export const addProduct = async (req, res, next) => {
    try {
      const { title, description, price, size, color, images } = req.body;
  
      // Check if all required fields are provided
      if (!title || !description || !price || !size || !color || !images || !images.length) {
        return next(errorHandler(400, "All fields are required, and at least one image must be provided"));
      }
  
      // Create a new product
      const newProduct = new Product({
        title,
        description,
        price,
        size,
        color,
        images, // Using the array of image URLs/paths
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

export const getSingleProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    // Validate the product ID
    if (!productId || !isValidObjectId(productId)) {
      return next(
        errorHandler(
          400,
          productId ? "Invalid product ID" : "Product ID is required"
        )
      );
    }

    // Find the product by its ID
    const product = await Product.findById(productId);

    // If product is not found, return a 404 error
    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }

    // Respond with the product details
    return res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // Retrieve the userId from req.user, set by verifyToken middleware
    const { productId, quantity } = req.body;

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Calculate total price for the item
    const totalPrice = product.price * quantity;

    // Find or create the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If cart doesn't exist, create a new cart with the product
      cart = new Cart({
        userId,
        items: [{ productId, quantity, totalPrice }],
        totalCartPrice: totalPrice,
      });
    } else {
      // If cart exists, add the product as a new item without modifying existing items
      cart.items.push({ productId, quantity, totalPrice });

      // Recalculate the total cart price
      cart.totalCartPrice = cart.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    }

    // Save the cart
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding to cart" });
  }
};

// Get cart by userId
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Retrieve the userId from req.user
    console.log("user ID:", userId);

    // Find the cart by userId and populate product details (title, price, image)
    const cart = await Cart.findOne({ userId }).populate("items.productId", "title price image");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Map cart items to match frontend expectations
    const items = cart.items.map(item => ({
      id: item.productId.id,
      title: item.productId.title,
      price: item.productId.price,
      image: item.productId.image,
      quantity: item.quantity,
    }));

    return res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving cart" });
  }
};


// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id; // Retrieve the userId from req.user
    const { productId } = req.params;

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item to remove
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Remove item from cart
    cart.items.splice(itemIndex, 1);

    // Recalculate total cart price
    cart.totalCartPrice = cart.items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    // Save the updated cart
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error removing cart item" });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id; // Retrieve the userId from req.user

    // Find and remove the user's cart
    const cart = await Cart.findOneAndDelete({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error clearing cart" });
  }
};

// {
//   "email":"userone@mail.com",
//   "password":"12345678"
// }
