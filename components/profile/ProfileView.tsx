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

const BASE_URL = process.env.BACK_END_URL ;

async function getMe() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      redirect("/auth/login");
    }

    const result = await res.json();
    return result?.data || result;
  } catch (error) {
    redirect("/auth/login");
  }
}

export default async function ProfileView() {
  const user = await getMe();

  const userRole = (user?.role || "tenant").toLowerCase();
  const editProfileHref = `/dashboard/${userRole}/profile/edit`;

  return (
    <main className="min-h-screen bg-slate-50/80 text-slate-800 py-12 px-4 sm:px-6 relative">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl">
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-6 py-12 text-white text-center">
            <div className="relative h-28 w-28 mx-auto overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-2xl">
              <Image
                src={user?.profileImage || "/avatar.png"}
                alt={user?.name || "User Profile"}
                fill
                className="object-cover"
              />
            </div>
            <h1 className="mt-5 text-2xl font-black text-white">{user?.name || "User Profile"}</h1>
            <p className="text-sm text-blue-100 font-medium">{user?.email}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1 text-xs font-bold text-white border border-white/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="uppercase">{user?.role || "USER"}</span>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                <User className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Full Name</p>
                  <p className="font-semibold text-slate-700">{user?.name || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                <Mail className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Email</p>
                  <p className="font-semibold text-slate-700">{user?.email || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                <Phone className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Phone</p>
                  <p className="font-semibold text-slate-700">{user?.phone || "Not Added"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                <MapPin className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Address</p>
                  <p className="font-semibold text-slate-700">{user?.address || "Not Added"}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <Link href={editProfileHref} className="block w-full">
                <Button className="w-full h-12 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700">
                  <Edit3 className="h-4 w-4 mr-2" /> Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}