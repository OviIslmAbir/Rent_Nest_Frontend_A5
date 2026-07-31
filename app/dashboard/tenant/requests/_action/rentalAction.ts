"use server";

import { createRentalRequest } from "@/services/rental";

interface RentalPayload {
  propertyId: string;
  moveInDate: string;
  duration: number;
  message: string;
}

export async function rentalRequestAction(payload: RentalPayload) {
  try {
    const result = await createRentalRequest(payload);
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong in server action",
    };
  }
}