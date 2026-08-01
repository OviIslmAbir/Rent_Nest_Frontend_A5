"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPaymentAction } from "@/app/dashboard/tenant/payments/_action/payment";


interface PayButtonProps {
  rentalRequestId: string;
  amount: number;
}

export default function PayButton({ rentalRequestId, amount }: PayButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);

      const response = await createPaymentAction(rentalRequestId);


      if (response?.success && response?.data?.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        alert(response?.message || "Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong while connecting to Stripe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePay}
      disabled={loading}
      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-5 py-2.5 text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <CreditCard className="w-4 h-4" />
      )}
      Pay ${amount?.toLocaleString()} Now
    </Button>
  );
}