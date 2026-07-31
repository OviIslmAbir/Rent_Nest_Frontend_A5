import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  Edit3,
  CheckCircle2,
} from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

async function getMe() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  try {
    const res = await fetch(
      "https://rentnest-nine.vercel.app/api/auth/me",
      {
        headers: {
          Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Fetch failed with status:", res.status);
      redirect("/auth/login");
    }

    const result = await res.json();
    return result?.data || result;
  } catch (error) {
    console.error("Error fetching user data:", error);
    redirect("/auth/login");
  }
}

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <main className="min-h-screen bg-slate-50/80 text-slate-800 py-12 px-4 sm:px-6 relative">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-72 bg-gradient-to-b from-blue-50/60 to-transparent pointer-events-none -z-10" />

      <div className="mx-auto max-w-4xl">

        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">

          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-6 py-12 sm:px-10 text-white">
            <div className="absolute top-0 right-0 h-48 w-48 bg-white/10 blur-2xl rounded-full pointer-events-none" />

            <div className="relative flex flex-col items-center text-center">

              <div className="relative group">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <Image
                    src={user?.profileImage || "/avatar.png"}
                    alt={user?.name || "User Profile"}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                </span>
              </div>


              <h1 className="mt-5 text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2 text-white">
                {user?.name || "User Profile"}
              </h1>

              <p className="mt-1 text-sm text-blue-100 font-medium">
                {user?.email}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1 text-xs font-bold text-white border border-white/20 backdrop-blur-md">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span className="uppercase tracking-wider">{user?.role || "USER"}</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800 tracking-wide flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                Personal Information
              </h2>
            </div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">

              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5 transition-all hover:border-blue-200 hover:bg-blue-50/30">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <User className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</p>
                  <p className="mt-0.5 truncate font-semibold text-slate-700">{user?.name || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5 transition-all hover:border-indigo-200 hover:bg-indigo-50/30">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                  <p className="mt-0.5 truncate font-semibold text-slate-700">{user?.email || "N/A"}</p>
                </div>
              </div>


              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5 transition-all hover:border-purple-200 hover:bg-purple-50/30">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Role</p>
                  <p className="mt-0.5 font-semibold text-slate-700 capitalize">{user?.role || "N/A"}</p>
                </div>
              </div>


              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5 transition-all hover:border-emerald-200 hover:bg-emerald-50/30">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</p>
                  <p className="mt-0.5 font-semibold text-slate-700">{user?.phone || "Not Added"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5 transition-all hover:border-amber-200 hover:bg-amber-50/30">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Address</p>
                  <p className="mt-0.5 truncate font-semibold text-slate-700">{user?.address || "Not Added"}</p>
                </div>
              </div>


              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5 transition-all hover:border-rose-200 hover:bg-rose-50/30">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Member Since</p>
                  <p className="mt-0.5 font-semibold text-slate-700">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>

   
              <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5 md:col-span-2">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Status</p>
                    <p className="text-sm font-semibold text-slate-600">Verified and Active Account</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  {user?.status || "ACTIVE"}
                </span>
              </div>
            </div>


            <div className="mt-8 border-t border-slate-100 pt-6">
              <Link href="/dashboard/profile/edit" className="block w-full">
                <Button className="w-full h-12 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}