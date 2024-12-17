'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/@/components/ui/button";
import { Input } from "@/@/components/ui/input";
import { Card } from "@/@/components/ui/card";
import { toast } from "@/@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/@/components/ui/form";

const paymentMethods = [
  { id: "credit_card", name: "Credit Card", icon: "/icons/credit-card.png" },
  { id: "paypal", name: "PayPal", icon: "/icons/paypal.png" },
  { id: "upi", name: "UPI", icon: "/icons/upi.png" },
  { id: "net_banking", name: "Net Banking", icon: "/icons/net-banking.png" },
  { id: "wallet", name: "Wallet", icon: "/icons/wallet.png" },
];

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number").optional(),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)").optional(),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV").optional(),
  upiId: z.string().min(1, "UPI ID is required").optional(),
  bankAccountNumber: z.string().min(1, "Bank account number is required").optional(),
  walletId: z.string().min(1, "Wallet ID or phone number is required").optional(),
});

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      upiId: "",
      bankAccountNumber: "",
      walletId: "",
    },
  });

  const handlePayment = (values: z.infer<typeof formSchema>) => {
    if (!selectedMethod) {
      toast({
        title: "Error",
        description: "Please select a payment method.",
        variant: "destructive",
      });
      return;
    }
    console.log(values);
    toast({
      title: "Success",
      description: `Payment initiated with ${selectedMethod}.`,
    });
  };

  return (
    <div className="container mx-auto py-10 px-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Payment Information</h1>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">Select Payment Method</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentMethods.map((method) => (
            <Card
              key={method.id}
              className={`p-6 border rounded-xl shadow-lg cursor-pointer transition-all transform hover:scale-105 ${
                selectedMethod === method.name ? "border-blue-600" : "border-gray-300"
              }`}
              onClick={() => setSelectedMethod(method.name)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={method.icon}
                  alt={method.name}
                  className="w-16 h-16 object-contain"
                />
                <span className="text-xl font-medium text-gray-900">{method.name}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-6">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Enter Payment Details</h2>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Amount" type="number" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedMethod === "Credit Card" && (
                <>
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Card Number" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} className="w-full" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="CVV" type="password" {...field} className="w-full" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
              {selectedMethod === "UPI" && (
                <FormField
                  control={form.control}
                  name="upiId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UPI ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter UPI ID" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {selectedMethod === "Net Banking" && (
                <FormField
                  control={form.control}
                  name="bankAccountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Account Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Bank Account Number" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {selectedMethod === "Wallet" && (
                <FormField
                  control={form.control}
                  name="walletId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wallet ID or Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Wallet ID or Phone Number" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full max-w-xs py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-all"
            >
              Proceed to Pay
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

