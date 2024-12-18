"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../components/ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter
} from "../@/components/ui/drawer";
import { Link } from "react-router-dom";
import { toast } from "@/@/hooks/use-toast";

interface Product {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isItemsLoading, setIsItemsLoading] = useState(false);
  const [items, setItems] = useState<Product[]>([]);

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchItems = async () => {
      setIsItemsLoading(true);
      try {
        const res = await fetch("/api/user/cart-items");
        const data = await res.json();
        console.log("fetched data:", data);

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch cart items");
        }
        setItems(data.items || []); // Safeguard against undefined items
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Could not fetch cart items. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsItemsLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Calculate total price
  const totalPrice = items.reduce((acc, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 0;
    return acc + price * quantity;
  }, 0);

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
              {isItemsLoading ? (
                <p className="text-center text-gray-600">Loading...</p>
              ) : items.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty.</p>
              ) : (
                <ul className="space-y-4">
                  {items.map((product) => (
                    <li key={product.id} className="flex justify-between items-center p-4 border-b">
                      <div>
                        <h3 className="text-lg font-medium">{product.title}</h3>
                        <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-lg font-semibold">
                          ${product.price ? product.price.toFixed(2) : "0.00"}
                        </span>
                        <span className="text-sm text-gray-500">x{product.quantity}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-4 flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <DrawerFooter>
            <Link to="/payment">
              <Button>Buy Now</Button>
            </Link>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
