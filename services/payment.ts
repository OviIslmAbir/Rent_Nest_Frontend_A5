import { cookies } from "next/headers";

const BASE_URL = process.env.BACK_END_URL;

export const createPaymentSession = async (rentalRequestId: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${BASE_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rentalRequestId }),
    });

    return await res.json();
  } catch (error) {
    console.error("createPaymentSession error:", error);
    return {
      success: false,
      message: "Failed to connect with payment service",
    };
  }
};

export const getMyPayments = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${BASE_URL}/api/payments`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, data: [] };
    }

    return await res.json();
  } catch (error) {
    console.error("getMyPayments error:", error);
    return { success: false, data: [] };
  }
};

export const getSinglePayment = async (id: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${BASE_URL}/api/payments/${id}`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, data: null };
    }

    return await res.json();
  } catch (error) {
    console.error("getSinglePayment error:", error);
    return { success: false, data: null };
  }
};