'use client'

import { useState } from 'react'
import { Star, ShoppingCart, Heart, ZoomIn } from 'lucide-react'
import { Button } from '../@/components/ui/button'
import { Card, CardContent } from '../@/components/ui/card'
import { Badge } from '../@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../@/components/ui/tabs'

const product = {
  name: 'Premium Wireless Headphones',
  price: 299.99,
  discount: 50,
  rating: 4.8,
  reviews: 1024,
  description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.',
  features: [
    'Active Noise Cancellation',
    '40-hour battery life',
    'Comfortable over-ear design',
    'Bluetooth 5.0 connectivity',
  ],
  colors: ['Black', 'White', 'Rose Gold'],
  images: [
    '/placeholder.svg?height=400&width=400',
    '/placeholder.svg?height=400&width=400',
    '/placeholder.svg?height=400&width=400',
  ],
}

const relatedProducts = [
  { name: 'Wireless Earbuds', price: 129.99, image: '/placeholder.svg?height=200&width=200' },
  { name: 'Bluetooth Speaker', price: 79.99, image: '/placeholder.svg?height=200&width=200' },
  { name: 'Noise-Cancelling Headphones', price: 249.99, image: '/placeholder.svg?height=200&width=200' },
]

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative group">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg transition-all duration-300 transform group-hover:scale-105"
            />
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-4 right-4 transition-opacity opacity-0 group-hover:opacity-100"
              onClick={() => {/* Implement zoom functionality */}}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex space-x-4">
            {product.images.map((img, index) => (
              <button
                key={index}
                className={`relative w-20 h-20 rounded-md overflow-hidden transition-all duration-200 ${index === activeImage ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-gray-900">${product.price - product.discount}</span>
            {product.discount > 0 && (
              <>
                <span className="text-xl text-gray-500 line-through">${product.price}</span>
                <Badge className="bg-red-500 text-white">Save ${product.discount}</Badge>
              </>
            )}
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Color</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full ${color === selectedColor ? 'ring-2 ring-primary' : ''}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <button
                className="px-3 py-1 text-xl text-gray-900"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-3 py-1 text-xl text-gray-900">{quantity}</span>
              <button
                className="px-3 py-1 text-xl text-gray-900"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <Button size="lg" className="flex-1 bg-primary text-white">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="icon" variant="outline" className="text-gray-900">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <Tabs defaultValue="features">
            <TabsList className="mt-6">
              <TabsTrigger value="features" className="font-medium text-gray-900 hover:text-primary">Features</TabsTrigger>
              <TabsTrigger value="specs" className="font-medium text-gray-900 hover:text-primary">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="features">
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specs">
              <p className="text-gray-600">Detailed specifications would go here.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {relatedProducts.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <div className="relative aspect-square mb-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                </div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {/* Add customer review components here */}
      </div>
    </div>
  )
}
