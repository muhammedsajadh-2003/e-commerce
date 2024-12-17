'use client'

import React, { useState } from 'react'
import { Button } from "@/@/components/ui/button"
import { Input } from "@/@/components/ui/input"
import { Textarea } from "@/@/components/ui/textarea"
import { toast } from "@/@/hooks/use-toast"

export default function AddProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    if (!productTitle || !productDescription || !productPrice || !productSize || !productColor || !productImage) {
      toast({
        title: "Validation Error",
        description: "Please provide all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', productTitle);
      formData.append('description', productDescription);
      formData.append('price', productPrice);
      formData.append('size', productSize);
      formData.append('color', productColor);
      if (productImage) {
        formData.append('image', productImage);
      }

      const response = await fetch("/api/product/add-product", {
        method: "POST",
        body: formData, // Use FormData instead of JSON for file upload
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();

      // Update products state
      setProducts((prevProducts) => [data.newProduct, ...prevProducts]);

      toast({
        title: "Success",
        description: "Product added successfully"
      });

      // Reset form fields
      setProductTitle("");
      setProductDescription("");
      setProductPrice("");
      setProductSize("");
      setProductColor("");
      setProductImage(null);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product, please try again",
        variant: "destructive"
      });

    } finally {
      setIsLoading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProductImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center py-10 px-4 min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="productName" className="block font-medium mb-2">Product Name</label>
            <Input 
              id="productName"
              placeholder="Enter product name" 
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium mb-2">Description</label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              className="resize-none"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block font-medium mb-2">Price</label>
              <Input 
                id="price"
                type="number" 
                placeholder="Enter price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="size" className="block font-medium mb-2">Size</label>
              <Input 
                id="size"
                placeholder="Enter product size"
                value={productSize}
                onChange={(e) => setProductSize(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="color" className="block font-medium mb-2">Color</label>
              <Input 
                id="color"
                placeholder="Enter product color"
                value={productColor}
                onChange={(e) => setProductColor(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="image" className="block font-medium mb-2">Product Image</label>
            <Input 
              id="image"
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 py-3 rounded-lg shadow-md"
          >
            {isLoading ? "Adding Product..." : "Add Product"}
          </Button>
        </form>
      </div>
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col">
              {product.image && (
                <img
                  src={URL.createObjectURL(product.image)}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center text-gray-800">
                <span className="font-medium">${product.price}</span>
                <span className="text-sm">Size: {product.size}</span>
              </div>
              <div className="flex justify-between items-center text-gray-800 mt-2">
                <span className="text-sm">Color: {product.color}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}