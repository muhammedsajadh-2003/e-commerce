import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    images: [{ type: String, required: true }], // Array of URLs or paths to images
  },
  { timestamps: true }
);

// Check if the model already exists to avoid OverwriteModelError
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
