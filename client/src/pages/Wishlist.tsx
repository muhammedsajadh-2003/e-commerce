"use client"

import React from "react"
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from "@/@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/@/components/ui/badge"

// Define types for our wishlist item
type WishlistItem = {
  id: string
  name: string
  price: number
  image: string
}

// Mock data for wishlist items
const mockWishlistItems: WishlistItem[] = [
  { id: "1", name: "Wireless Earbuds", price: 99.99, image: "/placeholder.svg?height=200&width=200" },
  { id: "2", name: "Smart Watch", price: 199.99, image: "/placeholder.svg?height=200&width=200" },
  { id: "3", name: "Noise-Cancelling Headphones", price: 299.99, image: "/placeholder.svg?height=200&width=200" },
  { id: "4", name: "Portable Charger", price: 49.99, image: "/placeholder.svg?height=200&width=200" },
]

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = React.useState<WishlistItem[]>(mockWishlistItems)

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
  }

  const addToCart = (id: string) => {
    console.log(`Added item ${id} to cart`)
    // Here you would typically add the item to the cart state or send a request to your backend
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">
          {wishlistItems.length} item{wishlistItems.length !== 1 && 's'} in your wishlist
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <CardContent className="p-4">
              <div className="aspect-square relative mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full rounded-md"
                />
                <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                  <Heart className="w-4 h-4 mr-1" />
                  Wishlist
                </Badge>
              </div>
              <h2 className="font-semibold text-lg mb-2">{item.name}</h2>
              <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex justify-between mt-auto p-4">
              <Button variant="outline" size="sm" onClick={() => removeFromWishlist(item.id)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
              <Button size="sm" onClick={() => addToCart(item.id)}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {wishlistItems.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-4">
            Add items to your wishlist to keep track of what you want to buy later.
          </p>
          <Button>Start Shopping</Button>
        </div>
      )}
    </div>
  )
}

