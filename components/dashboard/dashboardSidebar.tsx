"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  CreditCard,
  Star,
  Building2,
  Users,
  User,
} from "lucide-react";

const menu = [
  {
    role: "TENANT",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard/tenant",
        icon: LayoutDashboard,
      },
      {
        name: "Rental Requests",
        href: "/dashboard/tenant/requests",
        icon: Home,
      },
      {
        name: "Payments",
        href: "/dashboard/tenant/payments",
        icon: CreditCard,
      },
      {
        name: "Reviews",
        href: "/dashboard/tenant/reviews",
        icon: Star,
      },
      {
        name: "Profile",
        href: "/dashboard/profile",
        icon: User,
      },
    ],
  },

  {
    role: "LANDLORD",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard/landlord",
        icon: LayoutDashboard,
      },
      {
        name: "Properties",
        href: "/dashboard/landlord/properties",
        icon: Building2,
      },
      {
        name: "Rental Requests",
        href: "/dashboard/landlord/requests",
        icon: Home,
      },
      {
        name: "Profile",
        href: "/dashboard/profile",
        icon: User,
      },
    ],
  },

  {
    role: "ADMIN",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard/admin",
        icon: LayoutDashboard,
      },
      {
        name: "Users",
        href: "/dashboard/admin/users",
        icon: Users,
      },
      {
        name: "Properties",
        href: "/dashboard/admin/properties",
        icon: Building2,
      },
      {
        name: "Rentals",
        href: "/dashboard/admin/rentals",
        icon: Home,
      },
      {
        name: "Profile",
        href: "/dashboard/profile",
        icon: User,
      },
    ],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const role = "TENANT";

  const currentMenu =
    menu.find((item) => item.role === role)?.items || [];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-blue-600">
          RENTNEST
        </h2>
      </div>

      <nav className="p-4 space-y-2">
        {currentMenu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
              ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}