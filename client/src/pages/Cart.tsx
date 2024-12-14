"use client"

import * as React from "react"
import { ShoppingCart } from 'lucide-react'
import { Button } from "../components/ui/Button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../@/components/ui/drawer"
import { Link } from "react-router-dom"

interface Product {
  id: string
  name: string
  price: number
  quantity: number
}

const cartProducts: Product[] = [
  { id: "1", name: "Product 1", price: 29.99, quantity: 2 },
  { id: "2", name: "Product 2", price: 19.99, quantity: 1 },
  { id: "3", name: "Product 3", price: 49.99, quantity: 1 },
]

export function CartDrawer() {
  const [isOpen, setIsOpen] = React.useState(false)
  const totalPrice = cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  )

  const handleBuyNow = () => {
    setIsOpen(false) // Close the drawer when the button is clicked
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 border-none">
          <ShoppingCart className="h-4 w-4" />
          Cart
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Your Cart</DrawerTitle>
            <DrawerDescription>Manage your cart and checkout.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="mt-4">
              <ul className="space-y-4">
                {cartProducts.length === 0 ? (
                  <p className="text-center text-gray-600">Your cart is empty.</p>
                ) : (
                  cartProducts.map((product) => (
                    <li key={product.id} className="flex justify-between items-center p-4 border-b">
                      <div>
                        <h3 className="text-lg font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                        <span className="text-sm text-gray-500">x{product.quantity}</span>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="mt-4 flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <DrawerFooter>
            <Button onClick={handleBuyNow}>
              <Link to='/payment'>Buy Now</Link>
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
