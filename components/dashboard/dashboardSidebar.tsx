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
  ArrowLeft,
  PlusCircle,
} from "lucide-react";

type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

export default function DashboardSidebar({ userRole }: { userRole?: UserRole }) {
  const pathname = usePathname();

  let detectedRole: UserRole = "TENANT";
  if (pathname.startsWith("/dashboard/landlord")) {
    detectedRole = "LANDLORD";
  } else if (pathname.startsWith("/dashboard/admin")) {
    detectedRole = "ADMIN";
  } else if (pathname.startsWith("/dashboard/tenant")) {
    detectedRole = "TENANT";
  }

  const activeRole: UserRole = userRole || detectedRole;

  const menu: Record<UserRole, MenuItem[]> = {
    TENANT: [
      { name: "Dashboard", href: "/dashboard/tenant", icon: LayoutDashboard },
      { name: "Rental Requests", href: "/dashboard/tenant/requests", icon: Home },
      { name: "Payments", href: "/dashboard/tenant/payments", icon: CreditCard },
      { name: "Reviews", href: "/dashboard/tenant/reviews", icon: Star },
      { name: "Profile", href: "/dashboard/tenant/profile", icon: User },
    ],
    LANDLORD: [
      { name: "Dashboard", href: "/dashboard/landlord", icon: LayoutDashboard },
      { name: "Properties", href: "/dashboard/landlord/properties", icon: Building2 },
      { name: "Add Property", href: "/dashboard/landlord/properties/new", icon: PlusCircle },
      { name: "Rental Requests", href: "/dashboard/landlord/requests", icon: Home },
      { name: "Profile", href: "/dashboard/landlord/profile", icon: User },
    ],
    ADMIN: [
      { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
      { name: "Users-Management", href: "/dashboard/admin/users", icon: Users },
      { name: "Properties", href: "/dashboard/admin/properties", icon: Building2 },
      { name: "Rental Requests", href: "/dashboard/admin/requests", icon: Home },
      { name: "Profile", href: "/dashboard/admin/profile", icon: User },
    ],
  };

  const currentMenu = menu[activeRole] || menu.TENANT;

  // চেক করবে মেনুর কোনোটির সাথে Exact Match আছে কিনা
  const hasExactMatch = currentMenu.some((item) => pathname === item.href);

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col justify-between border-r border-slate-100 bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/50 z-50">
      <div>
        <div className="flex items-center justify-between p-6 pb-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                RENTNEST
              </h2>
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                {activeRole} PANEL
              </p>
            </div>
          </Link>
        </div>

        <div className="px-6 my-2">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        <nav className="p-4 space-y-1.5">
          {currentMenu.map((item) => {
            const Icon = item.icon;

            // যদি কোনো মেনু আইটেমের সাথে Exact Match মিলে যায়, তবে শুধুমাত্র সেটাই active হবে।
            // কোনো নির্দিষ্ট ম্যাচ না থাকলে (যেমন Sub-route বা Edit page-এ থাকলে) startsWith চেক করবে।
            const isActive = hasExactMatch
              ? pathname === item.href
              : pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                {isActive && (
                  <span className="absolute -left-4 top-1/2 h-6 w-1.5 -translate-y-1/2 rounded-r-full bg-blue-600" />
                )}

                <Icon
                  size={20}
                  className={`transition-transform duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:scale-110 group-hover:text-blue-600"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 space-y-3">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm group"
        >
          <ArrowLeft
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span>Back to Home</span>
        </Link>

        <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/80 p-3.5 border border-slate-100/80 text-center">
          <p className="text-xs text-slate-500 font-medium">Logged in as</p>
          <span className="inline-block mt-0.5 rounded-full bg-blue-100/80 px-3 py-0.5 text-[11px] font-bold text-blue-700">
            {activeRole}
          </span>
        </div>
      </div>
    </aside>
  );
}