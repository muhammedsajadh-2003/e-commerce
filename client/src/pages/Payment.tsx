'use client'

import { useState } from "react";
import { Button } from "@/@/components/ui/button";
import { Input } from "@/@/components/ui/input";
import { Card } from "@/@/components/ui/card";
import { toast } from "@/@/hooks/use-toast";
import { Link } from "react-router-dom";

const paymentMethods = [
  { id: "credit_card", name: "Credit Card", icon: "/icons/credit-card.png" },
  { id: "paypal", name: "PayPal", icon: "/icons/paypal.png" },
  { id: "upi", name: "UPI", icon: "/icons/upi.png" },
  { id: "net_banking", name: "Net Banking", icon: "/icons/net-banking.png" },
  { id: "wallet", name: "Wallet", icon: "/icons/wallet.png" },
];

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handlePayment = () => {
    if (!selectedMethod) {
      toast({
        title: "Error",
        description: "Please select a payment method.",
        variant: "destructive",
      });
      return;
    }
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

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Enter Payment Details</h2>
        {selectedMethod && (
          <div className="space-y-6">
            <Input placeholder="Enter Amount" type="number" className="w-full" />
            {selectedMethod === "Credit Card" && (
              <>
                <Input placeholder="Card Number" className="w-full" />
                <div className="flex gap-4">
                  <Input placeholder="MM/YY" className="w-1/2" />
                  <Input placeholder="CVV" type="password" className="w-1/2" />
                </div>
              </>
            )}
            {selectedMethod === "UPI" && (
              <Input placeholder="Enter UPI ID" className="w-full" />
            )}
            {selectedMethod === "Net Banking" && (
              <Input placeholder="Bank Account Number" className="w-full" />
            )}
            {selectedMethod === "Wallet" && (
              <Input placeholder="Wallet ID or Phone Number" className="w-full" />
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handlePayment}
          className="w-full max-w-xs py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-all"
        >
          <Link to='afterPayment' >Proceed to Pay</Link>
          
        </Button>
      </div>
    </div>
  );
}
