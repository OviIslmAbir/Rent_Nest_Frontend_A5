const BASE_URL = typeof window !== "undefined" ? "" : "https://rentnest-nine.vercel.app";


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
  createdAt?: string;
}

export const getAllUsers = async (): Promise<UserItem[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/users`, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) return [];

    const result = await res.json();
    return Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result)
      ? result
      : [];
  } catch (error) {
    console.error("getAllUsers error:", error);
    return [];
  }
};

export const updateUserByAdmin = async (
  userId: string,
  payload: { role?: string; status?: string; isBlocked?: boolean }
) => {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const responseText = await res.text();

    try {
      const parsedData = JSON.parse(responseText);

      if (!res.ok) {
        return {
          success: false,
          message: parsedData?.message || `Server Error (${res.status})`,
        };
      }

      return parsedData;
    } catch {
      return {
        success: false,
        message: `Server Error (${res.status}): ${responseText.slice(0, 100)}`,
      };
    }
  } catch (error) {
    console.error("updateUserByAdmin error:", error);
    return { success: false, message: "Network error occurred." };
  }
};