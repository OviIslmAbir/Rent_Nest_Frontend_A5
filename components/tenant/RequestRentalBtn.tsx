

"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { rentalRequestAction } from "@/app/dashboard/tenant/requests/_action/rentalAction";


interface Props {
  propertyId: string;
  alreadyRequested: boolean;
}

export default function RequestRentalButton({
  propertyId,
  alreadyRequested,
}: Props) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleRequest = () => {
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

  return (
    <Button
      disabled={alreadyRequested || pending}
      onClick={handleRequest}
      className="w-full mt-8"
    >
      {alreadyRequested
        ? "Already Requested"
        : pending
        ? "Sending..."
        : "Request Rental"}
    </Button>
  );
}