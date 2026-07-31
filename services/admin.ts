const BASE_URL = typeof window !== "undefined" ? "" : "https://rentnest-nine.vercel.app";
export interface RentalRequestItem {
  id: string;
  tenantId: string;
  propertyId: string;
  moveInDate: string;
  duration: number;
  message?: string;
  totalAmount?: number;
  status: string;
  createdAt: string;
  tenant?: {
    name?: string;
    email?: string;
  };
  property?: {
    title?: string;
    landlord?: {
      name?: string;
      email?: string;
    };
  };
}

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
};

const getAuthHeaders = () => {
  const token = getCookie("accessToken") || getCookie("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    const cleanToken = token.replace(/^Bearer\s+/i, "").trim();
    headers["Authorization"] = `Bearer ${cleanToken}`;
  }
  return headers;
};

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "LANDLORD" | "TENANT";
  status?: "ACTIVE" | "BLOCKED";
  isBlocked?: boolean;
}

export interface PropertyItem {
  id: string;
  title: string;
  location: string;
  price: number;
  isAvailable?: boolean;
}

// 1. Fetch All Users
export const getAllUsers = async (): Promise<UserItem[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/users`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) return [];
    const result = await res.json();
    return Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("getAllUsers error:", error);
    return [];
  }
};

// 2. Fetch All Properties
export const getAllProperties = async (): Promise<PropertyItem[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/properties`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) return [];
    const result = await res.json();
    return Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("getAllProperties error:", error);
    return [];
  }
};


// 4. Update User Status
export const updateUserByAdmin = async (
  userId: string,
  payload: { role?: string; status?: string; isBlocked?: boolean }
) => {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const responseText = await res.text();
    try {
      return JSON.parse(responseText);
    } catch {
      return { success: res.ok, message: responseText };
    }
  } catch (error) {
    return { success: false, message: "Network error occurred." };
  }
};

export const getAllRentals = async (): Promise<RentalRequestItem[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/rentals`, { // ✅ /api/ যোগ করা হয়েছে
      headers: getAuthHeaders(),
      cache: "no-store",
    });

    if (!res.ok) return [];
    const result = await res.json();
    return Array.isArray(result?.data) ? result.data : [];
  } catch (error) {
    console.error("getAllRentals error:", error);
    return [];
  }
};