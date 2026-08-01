"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { rentalRequestAction } from "@/app/dashboard/tenant/requests/_action/rentalAction";

interface Props {
  propertyId: string;
  alreadyRequested: boolean;
  status?: string;
}

export default function RequestRentalButton({
  propertyId,
  alreadyRequested,
  status,
}: Props) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const isAvailable = !status || status.toLowerCase() === "available";
  const currentStatus = status?.toLowerCase();


  const isDisabled = !isAvailable || alreadyRequested || pending;

  const handleContainerClick = () => {
    if (pending) return;

    if (!isAvailable) {
      if (currentStatus === "rented") {
        toast.error("This property is already rented!");
      } else if (currentStatus === "unavailable") {
        toast.error("This property is currently unavailable!");
      } else {
        toast.error("This property is not available for rent.");
      }
      return;
    }

  
    if (alreadyRequested) {
      toast("You have already submitted a rental request for this property!", {
        icon: "ℹ️",
      });
      return;
    }

    startTransition(async () => {
      const payload = {
        propertyId,
        moveInDate: new Date().toISOString(),
        duration: 12,
        message: "I would like to rent this property.",
      };

      const res = await rentalRequestAction(payload);

      if (res?.success) {
        toast.success(res.message || "Rental request sent successfully!");
        router.push("/dashboard/tenant/requests");
      } else {
        toast.error(res?.message || "Failed to send request.");
      }
    });
  };

  const getButtonText = () => {
    if (!isAvailable) {
      if (currentStatus === "rented") return "Property Rented";
      if (currentStatus === "unavailable") return "Property Unavailable";
      return `Status: ${status}`;
    }

    if (alreadyRequested) return "Already Requested";
    if (pending) return "Sending Request...";

    return "Request Rental";
  };

  return (
    <div onClick={handleContainerClick} className="w-full mt-8 cursor-pointer">
      <Button
        disabled={isDisabled}
        className={`w-full h-12 rounded-xl font-bold transition-all duration-200 ${
          !isAvailable
            ? "bg-slate-200 text-slate-500 border border-slate-300 pointer-events-none"
            : alreadyRequested
            ? "bg-amber-100 text-amber-700 border border-amber-300 pointer-events-none"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 active:scale-[0.98]"
        }`}
      >
        {getButtonText()}
      </Button>
    </div>
  );
}