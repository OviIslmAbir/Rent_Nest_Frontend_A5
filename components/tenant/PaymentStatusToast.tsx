"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  success?: boolean;
  canceled?: boolean;
};

export default function PaymentStatusToast({ success, canceled }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (success) {
      toast.success("Payment completed successfully! 🎉");
    } else if (canceled) {
      toast.error("Payment was cancelled.");
    }

    if (success || canceled) {
      router.replace(pathname);
    }
  }, [success, canceled, pathname, router]);

  return null;
}