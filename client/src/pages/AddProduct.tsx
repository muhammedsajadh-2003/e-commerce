'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/@/components/ui/button"
import { Input } from "@/@/components/ui/input"
import { Textarea } from "@/@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/@/components/ui/form"
import { toast } from "@/@/hooks/use-toast"

// Updated schema to match backend requirements
const formSchema = z.object({
  title: z.string().min(2, { message: "Product name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.string().refine((val) => !isNaN(Number(val)), { message: "Price must be a valid number." }),
  size: z.string().min(1, { message: "Size is required" }),
  color: z.string().min(1, { message: "Color is required" }),
})

interface Product {
  _id?: string
  title: string
  description: string
  price: string
  size: string
  color: string
  image?: string
}

export default function AddProductPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      size: "",
      color: "",
    },
  })

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts()
  }, [])

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/product/all-products')
      const data = await response.json()

      if (data.success) {
        setProducts(data.products)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch products",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching products", error)
      toast({
        title: "Error",
        description: "Failed to fetch products.",
        variant: "destructive",
      })
    }
  }

  // Handle form submission (add/update product)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newProduct: Product = {
      ...values,
      image: imagePreview || "https://via.placeholder.com/150",
    }

      
      const method = editingProduct && editingProduct._id ? 'PATCH' : 'POST'

      const response = await fetch(`/api/product/edit-product/${productId}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      })

      const data = await response.json()

      if (data.success) {
        if (editingProduct && editingProduct._id) {
          // Update existing product
          setProducts((prev) =>
            prev.map((product) =>
              product._id === editingProduct._id ? data.updatedProduct : product
            )
          )
          setEditingProduct(null)
          toast({
            title: "Product updated",
            description: "The product has been successfully updated.",
          })
        } else {
          // Add new product
          setProducts((prev) => [...prev, data.product])
          toast({
            title: "Product added",
            description: "The product has been successfully added.",
          })
        }
        
        // Reset form
        setImagePreview(null)
        form.reset()
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to submit product",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting product", error)
      toast({
        title: "Error",
        description: "Failed to submit product.",
        variant: "destructive",
      })
    }
  }

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to read the image file.",
          variant: "destructive",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Prepare product for editing
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    form.setValue('title', product.title)
    form.setValue('description', product.description)
    form.setValue('price', product.price)
    form.setValue('size', product.size)
    form.setValue('color', product.color)
    setImagePreview(product.image || null)
  }

  // Delete a product
  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/product/${productId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        setProducts((prev) => prev.filter((product) => product._id !== productId))
        toast({
          title: "Product deleted",
          description: "The product has been successfully deleted.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to delete product",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting product", error)
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col items-center py-10 px-4 min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Size</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product size" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Color</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormItem>
              <FormLabel className="font-medium">Product Image</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={handleImageUpload} />
              </FormControl>
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
              )}
            </FormItem>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 py-3 rounded-lg shadow-md"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </form>
        </Form>
      </div>
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.title}
              </h3>
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
              <div className="mt-4 flex justify-between">
                <Button
                  onClick={() => handleEditProduct(product)}
                  variant="outline"
                  className="text-blue-600"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteProduct(product._id!)}
                  variant="destructive"
                  className="text-red-600"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}