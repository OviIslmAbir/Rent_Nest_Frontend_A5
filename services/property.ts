const BASE_URL = (process.env.BACK_END_URL);


interface GetPropertiesParams {
  location?: string;
  category?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  amenities?: string;
  page?: string | number;
  limit?: string | number;
}

export const getProperties = async (params: GetPropertiesParams = {}) => {
  const query = new URLSearchParams();

  if (params.location) query.set("location", String(params.location));
  if (params.category) query.set("category", String(params.category));
  if (params.minPrice) query.set("minPrice", String(params.minPrice));
  if (params.maxPrice) query.set("maxPrice", String(params.maxPrice));
  if (params.amenities) query.set("amenities", String(params.amenities));
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));

  const queryString = query.toString();

  const res = await fetch(
    `${BASE_URL}/api/properties${
      queryString ? `?${queryString}` : ""
    }`,
    { cache: "no-store" }
  );

  const result = await res.json();

  return Array.isArray(result) ? result : result.data || [];
};


export async function getSingleProperty(id: string) {
  const res = await fetch(`${BASE_URL}/api/properties/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch property");
  }

  const data = await res.json();

  return data.data;
}