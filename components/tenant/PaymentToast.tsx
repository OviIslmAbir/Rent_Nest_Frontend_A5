"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "@/components/ui/toast"; 

interface PaymentToastProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function PaymentToast({ searchParams }: PaymentToastProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!searchParams) return;

    const status = searchParams.status || searchParams.payment;
    const isSuccess = status === "success" || searchParams.success === "true";
    const isCanceled =
      status === "cancel" ||
      status === "cancelled" ||
      searchParams.canceled === "true" ||
      searchParams.cancelled === "true";

    const triggerToast = (toast.add || toast) as (options: {
      title: string;
      description: string;
      type: "success" | "error";
    }) => void;

    if (isSuccess) {
      triggerToast({
        title: "Payment Successful! 🎉",
        description: "Your rent payment has been processed successfully.",
        type: "success",
      });


      router.replace(pathname, { scroll: false });
    } else if (isCanceled) {
      triggerToast({
        title: "Payment Cancelled ❌",
        description: "You cancelled the payment process. No charges were made.",
        type: "error",
      });

      router.replace(pathname, { scroll: false });
    }
  }, [searchParams, router, pathname]);

  return null;
}