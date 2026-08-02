// ================= Prisma Enums =================
export type UserRole = "ADMIN" | "LANDLORD" | "TENANT";
export type UserStatus = "ACTIVE" | "BANNED";
export type PropertyStatus = "AVAILABLE" | "RENTED" | "UNAVAILABLE";
export type RentalStatus = "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";
export type PaymentProvider = "STRIPE";

// ================= Interfaces =================

export interface User {
  id: string;
  name?: string | null;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Property {
  id: string;
  _id?: string;
  title: string;
  description?: string;
  location?: string;
  address?: string;
  city?: string;
  area?: string;
  rentPrice?: number;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  images?: string[];
  status?: "AVAILABLE" | "RENTED" | "UNAVAILABLE" | string;

  category: {
    name: string;
  };

  landlord: {
    name: string;
    email: string;
  };

  
}

export interface Payment {
  id: string;
  transactionId?: string | null;
  rentalRequestId: string;
  amount: number;
  provider: PaymentProvider;
  method?: string | null;
  status: PaymentStatus;
  paidAt?: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  rentalRequest?: RentalRequest;
}

export interface RentalRequest {
  id: string;
  tenantId: string;
  tenant?: User;
  propertyId: string;
  moveInDate: string | Date;
  duration: number;
  message?: string | null;
  totalAmount?: number | null;
  status: RentalStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
  property?: Property;
  payment?: Payment | null;
}

export interface Review {
  id?: string;
  _id?: string;
  rating: number;
  comment?: string;
  message?: string;
  createdAt?: string;
  tenant?: {
    name?: string;
    email?: string;
  };
  tenantName?: string;
  property?: {
    title?: string;
  };
  propertyTitle?: string;
}
