const BASE_URL = typeof window !== "undefined" ? "" : (process.env.BACK_END_URL);

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

export type UpdatePropertyPayload = Partial<CreatePropertyPayload>;

export interface RentalRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  message?: string;
  createdAt?: string;
  property?: {
    title: string;
    rentPrice: number;
  };
  tenant?: {
    name: string;
    email: string;
  };
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

export const getPropertyById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/landlord/properties/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
    });

    if (!res.ok) return { success: false, data: null };
    return await res.json();
  } catch (error) {
    console.error("getPropertyById error:", error);
    return { success: false, data: null };
  }
};

export const createProperty = async (payload: CreatePropertyPayload) => {
  try {
    const headers = getAuthHeaders();

    if (!headers["Authorization"]) {
      console.warn("⚠️ Warning: No Authorization token found in document.cookie!");
    }

    const res = await fetch(`${BASE_URL}/api/landlord/properties`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

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

export const deleteProperty = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/landlord/properties/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const responseText = await res.text();

    try {
      const data = JSON.parse(responseText);
      return data;
    } catch {
      console.error("Delete property non-JSON response:", responseText);
      return {
        success: false,
        message: `Server Error (${res.status}): Could not delete property.`,
      };
    }
  } catch (error) {
    console.error("deleteProperty network error:", error);
    return { success: false, message: "Network error while deleting property." };
  }
};

export const updateProperty = async (id: string, payload: UpdatePropertyPayload) => {
  try {
    const res = await fetch(`${BASE_URL}/api/landlord/properties/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    const responseText = await res.text();

    try {
      const data = JSON.parse(responseText);
      return data;
    } catch {
      console.error("Update property non-JSON response:", responseText);
      return {
        success: false,
        message: `Server Error (${res.status}): Could not update property.`,
      };
    }
  } catch (error) {
    console.error("updateProperty network error:", error);
    return { success: false, message: "Network error while updating property." };
  }
};


export const getLandlordRequests = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/landlord/requests`, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
    });

    if (!res.ok) return [];

    const result = await res.json();
    return Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("getLandlordRequests error:", error);
    return [];
  }
};

export const updateRentalRequestStatus = async (
  requestId: string,
  status: "APPROVED" | "REJECTED"
) => {
  try {
    const res = await fetch(`${BASE_URL}/api/landlord/requests/${requestId}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });

    const responseText = await res.text();

    try {
      const data = JSON.parse(responseText);
      return data;
    } catch {
      console.error("Update request status non-JSON response:", responseText);
      return {
        success: false,
        message: `Server Error (${res.status}): Could not update request status.`,
      };
    }
  } catch (error) {
    console.error("updateRentalRequestStatus network error:", error);
    return { success: false, message: "Network error while updating status." };
  }
};



export const landlordService = {
  getCategories,
  getMyProperties,
  getProperties: getMyProperties,
  getPropertyById,
  createProperty,
  deleteProperty,
  updateProperty,
  getLandlordRequests,
  updateRentalRequestStatus,
};