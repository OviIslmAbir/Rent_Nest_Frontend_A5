"use client";

import Link from "next/link";
import Image from "next/image";
import { User, LayoutDashboard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/auth/_actions/logoutActions";

interface UserMenuProps {
  role: string;
  userImage?: string | null; // পরবর্তীতে ইউজারের ছবি পাস করার জন্য
}

export default function UserMenu({ role, userImage }: UserMenuProps) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await logoutAction();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  const dashboard =
    role === "ADMIN"
      ? "/dashboard/admin"
      : role === "LANDLORD"
      ? "/dashboard/landlord"
      : "/dashboard/tenant";

  return (
    <div className="relative group">
      {/* Transparent Avatar Button */}
      <button className="w-10 h-10 rounded-full border border-slate-200/80 bg-transparent flex items-center justify-center text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all duration-200 overflow-hidden">
        {userImage ? (
          <Image
            src={userImage}
            alt="User Avatar"
            width={40}
            height={40}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <User size={20} />
        )}
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white/95 border border-slate-200/80 shadow-xl backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-1.5">
        <Link
          href={dashboard}
          className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all"
        >
          <LayoutDashboard size={18} className="text-blue-600" />
          Dashboard
        </Link>

        <div className="my-1 border-t border-slate-100" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}