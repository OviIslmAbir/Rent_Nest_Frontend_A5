export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  area: string;
  rentPrice: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  status: string;

  category: {
    name: string;
  };

  landlord: {
    name: string;
    email: string;
  };
}