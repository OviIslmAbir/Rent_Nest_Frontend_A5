"use server";

import { cookies } from "next/headers";

const BASE_URL = "https://rentnest-nine.vercel.app";

export interface ReviewPayload {
  propertyId: string;
  rating: number;
  comment: string;
}

const getAccessToken = async () => {
  const cookieStore = await cookies();

  return (
    cookieStore.get("accessToken")?.value ||
    cookieStore.get("token")?.value ||
    cookieStore.get("jwt")?.value ||
    null
  );
};

export const getMyPaidProperties = async () => {
  try {
    const token = await getAccessToken();

    if (!token) {
      return {
        success: false,
        message: "Unauthorized",
        data: [],
      };
    }

    const res = await fetch(`${BASE_URL}/api/payments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to fetch payments.",
        data: [],
      };
    }

    const payments = Array.isArray(result?.data) ? result.data : [];

    const properties = payments
      .filter(
        (payment: any) =>
          payment.status === "COMPLETED" &&
          payment.rentalRequest?.property
      )
      .map((payment: any) => ({
        id: payment.rentalRequest.property.id,
        title: payment.rentalRequest.property.title,
      }));

    const uniqueProperties = Array.from(
      new Map(properties.map((item) => [item.id, item])).values()
    );

    return {
      success: true,
      data: uniqueProperties,
    };
  } catch (error) {
    console.error("getMyPaidProperties:", error);

    return {
      success: false,
      message: "Internal Server Error",
      data: [],
    };
  }
};

export const createReview = async (payload: ReviewPayload) => {
  try {
    const token = await getAccessToken();

    if (!token) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const res = await fetch(`${BASE_URL}/api/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to submit review.",
      };
    }

    return {
      success: true,
      message: result?.message,
      data: result?.data,
    };
  } catch (error) {
    console.error("createReview:", error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
};