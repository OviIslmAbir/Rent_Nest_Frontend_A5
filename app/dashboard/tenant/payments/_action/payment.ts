"use server";

import { createPaymentSession } from "@/services/payment";

export async function createPaymentAction(rentalRequestId: string) {
  try {
    const result = await createPaymentSession(rentalRequestId);
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong creating payment session",
    };
  }
}