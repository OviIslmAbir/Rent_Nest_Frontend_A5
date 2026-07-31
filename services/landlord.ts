const BASE_URL = typeof window !== "undefined" ? "" : "https://rentnest-nine.vercel.app";

// Safe Cookie Parser Helper
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
};

// Authorization Header Generator
const getAuthHeaders = () => {
  const token = getCookie("accessToken") || getCookie("token"); // 'accessToken' না পেলে 'token' চেক করবে
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    // Bearer ডুপ্লিকেট হওয়া আটকানো
    const cleanToken = token.replace(/^Bearer\s+/i, "");
    headers["Authorization"] = `Bearer ${cleanToken}`;
  }

  return headers;
};

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface CreatePropertyPayload {
  title: string;
  description: string;
  address: string;
  city: string;
  area: string;
  rentPrice: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  categoryId: string;
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/categories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) return [];
    const result = await res.json();
    return result?.data || result || [];
  } catch (error) {
    console.error("getCategories error:", error);
    return [];
  }
};

export const getMyProperties = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/landlord/properties`, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
    });

    if (!res.ok) return { success: false, data: [] };
    return await res.json();
  } catch (error) {
    console.error("getMyProperties error:", error);
    return { success: false, data: [] };
  }
};

export const createProperty = async (payload: CreatePropertyPayload) => {
  try {
    const headers = getAuthHeaders();
    
    // টোকেন না থাকলে ব্রাউজার কনসোলে আগেই সতর্ক করবে
    if (!headers["Authorization"]) {
      console.warn("⚠️ Warning: No Authorization token found in document.cookie!");
    }

    const res = await fetch(`${BASE_URL}/api/landlord/properties`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    // সার্ভার থেকে HTML/Unexpected Text রেসপন্স আসলে হ্যান্ডেল করার নিরাপদ উপায়
    const responseText = await res.text();

    try {
      const data = JSON.parse(responseText);
      return data;
    } catch {
      console.error("Server raw non-JSON error response:", responseText);
      return {
        success: false,
        message: `Server Error (${res.status}): Something went wrong on the backend.`,
      };
    }
  } catch (error) {
    console.error("createProperty network error:", error);
    return { success: false, message: "Network error or server unreachable." };
  }
};

export const landlordService = {
  getCategories,
  getMyProperties,
  createProperty,
};