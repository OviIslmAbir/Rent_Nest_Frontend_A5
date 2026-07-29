const BASE_URL = "https://rentnest-nine.vercel.app/api";


export async function getProperties() {
  const res = await fetch(`${BASE_URL}/properties`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  const data = await res.json();

  return data.data;
}


export async function getSingleProperty(id: string) {
  const res = await fetch(`${BASE_URL}/properties/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch property");
  }

  const data = await res.json();

  return data.data;
}