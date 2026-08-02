"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "../home/footer";
import { UserRole } from "@/types";


interface LayoutWrapperProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
  userRole?: UserRole;
}

export default function LayoutWrapper({
  children,
  isLoggedIn = false,
  userRole = "TENANT", 
}: LayoutWrapperProps) {
  const pathname = usePathname();

  const hideLayout = pathname.startsWith("/dashboard");

  return (
    <>
      {!hideLayout && (
        <Navbar isLoggedIn={isLoggedIn} userRole={userRole} />
      )}

      {children}

      {!hideLayout && <Footer />}
    </>
  );
}