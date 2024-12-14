'use client'

import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Use React Router for navigation
import { Button } from "@/@/components/ui/button";
import { Card } from "@/@/components/ui/card";
import { toast } from "@/@/hooks/use-toast";

export default function PaymentConfirmationPage() {
  const navigate = useNavigate();  // Initialize the useNavigate hook
  const [paymentStatus, setPaymentStatus] = useState<string | null>("success");

  const handleGoBack = () => {
    // Navigate back to the payment page or wherever appropriate
    navigate("/payment");  // Use navigate to redirect to the payment page
  };

  const handleRetryPayment = () => {
    // Handle retry logic here
    toast({
      title: "Retrying Payment",
      description: "Please try again.",
      variant: "destructive",
    });
    // Optionally, add retry functionality here
  };

  return (
    <div className="container mx-auto py-10 px-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Payment Confirmation</h1>
      
      {paymentStatus === "success" ? (
        <div className="space-y-6 text-center">
          <Card className="p-6 border-2 border-green-500 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-600">Payment Successful!</h2>
            <p className="text-lg text-gray-700 mt-2">
              Your payment has been successfully processed. Thank you for your purchase!
            </p>
            <div className="mt-6">
              <Button
                onClick={() => navigate("/home")}  // Redirect to homepage or any other page
                className="w-full max-w-xs py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg text-lg font-semibold transition-all"
              >
                Go to Home
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <div className="space-y-6 text-center">
          <Card className="p-6 border-2 border-red-500 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-red-600">Payment Failed</h2>
            <p className="text-lg text-gray-700 mt-2">
              Something went wrong with your payment. Please try again later or contact support.
            </p>
            <div className="mt-6 space-x-4 flex justify-center">
              <Button
                onClick={handleGoBack}
                className="w-auto py-2 px-4 text-white bg-gray-600 hover:bg-gray-700 rounded-lg text-lg font-semibold transition-all"
              >
                Go Back
              </Button>
              <Button
                onClick={handleRetryPayment}
                className="w-auto py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded-lg text-lg font-semibold transition-all"
              >
                Retry Payment
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
