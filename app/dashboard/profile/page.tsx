import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
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
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-4xl px-5">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-10">
            <div className="flex flex-col items-center">
              <Image
                src={user?.profileImage || "/avatar.png"}
                alt={user?.name || "User"}
                width={120}
                height={120}
                className="h-30 w-30 rounded-full border-4 border-white object-cover bg-white"
              />

              <h1 className="mt-5 text-3xl font-bold text-white">
                {user?.name}
              </h1>

              <p className="mt-1 text-blue-100">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-8 md:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl border p-5">
              <User className="text-blue-600" />
              <div>
                <p className="text-sm text-slate-500">Full Name</p>
                <p className="font-semibold">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border p-5">
              <Mail className="text-blue-600" />
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-semibold">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border p-5">
              <ShieldCheck className="text-blue-600" />
              <div>
                <p className="text-sm text-slate-500">Role</p>
                <p className="font-semibold capitalize">
                  {user?.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border p-5">
              <Phone className="text-blue-600" />
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-semibold">
                  {user?.phone || "Not Added"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border p-5">
              <MapPin className="text-blue-600" />
              <div>
                <p className="text-sm text-slate-500">Address</p>
                <p className="font-semibold">
                  {user?.address || "Not Added"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border p-5">
              <CalendarDays className="text-blue-600" />
              <div>
                <p className="text-sm text-slate-500">Joined</p>
                <p className="font-semibold">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border p-5 md:col-span-2">
              <ShieldCheck className="text-green-600" />
              <div>
                <p className="text-sm text-slate-500">Account Status</p>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  {user?.status || "ACTIVE"}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t p-8">
            <Link href="/dashboard/profile/edit">
              <Button className="w-full h-12 rounded-xl">
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}