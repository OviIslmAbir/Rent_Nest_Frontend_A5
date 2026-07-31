import { cookies } from "next/headers";

const BASE_URL = "https://rentnest-nine.vercel.app";

export const getMyRentalRequests = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${BASE_URL}/api/rentals`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Fetch rentals error:", await res.text());
      return { success: false, data: [] };
    }

    return await res.json();
  } catch (error) {
    console.error("getMyRentalRequests error:", error);
    return { success: false, data: [] };
  }
};

export const createRentalRequest = async (payload: {
  propertyId: string;
  moveInDate: string;
  duration: number;
  message: string;
}) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "You must be logged in to send a request.",
      };
    }

    const res = await fetch(`${BASE_URL}/api/rentals`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error("createRentalRequest error:", error);
    return {
      success: false,
      message: "Server error or invalid API endpoint (Received non-JSON response)",
    };
  }
};
export const getSingleRentalRequest = async (id: string) => {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${BASE_URL}/api/rentals/${id}`, {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(await res.text());
    return null;
  }

  return await res.json();
};