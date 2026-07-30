import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RentNest",
  description: "Rental Property Platform",
};


export type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

interface CustomJwtPayload {
  role?: UserRole;
  exp?: number;
  iat?: number;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  let isLoggedIn = false;

  let userRole: UserRole = "TENANT";

  if (token) {
    isLoggedIn = true;
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token);

      if (decoded?.role) {
        userRole = decoded.role;
      }
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        geistSans.variable,
        geistMono.variable,
        inter.variable
      )}
    >
      <body className="min-h-screen">
        <LayoutWrapper isLoggedIn={isLoggedIn} userRole={userRole}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}