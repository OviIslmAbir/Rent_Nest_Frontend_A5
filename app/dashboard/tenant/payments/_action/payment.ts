"use server";

import { createPaymentSession } from "@/services/payment";

export async function createPaymentAction(rentalRequestId: string) {
  try {
    const result = await createPaymentSession(rentalRequestId);
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Something went wrong creating payment session",
    };
  }
}