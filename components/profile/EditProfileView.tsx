"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Phone, MapPin, ImageIcon, Save, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";


const BASE_URL = typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_API_URL || "https://rentnest-nine.vercel.app");

export default function EditProfileView() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [userRole, setUserRole] = useState<string>("tenant");

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    profileImage: "",
  });

  const getCookie = (name: string) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getCookie("accessToken");

        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (token) {
          headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
        }

        const res = await fetch(`${BASE_URL}/api/auth/me`, { headers });
        if (res.ok) {
          const result = await res.json();
          const user = result?.data || result;
          if (user?.role) setUserRole(user.role.toLowerCase());
          setFormData({
            phone: user?.phone || "",
            address: user?.address || "",
            profileImage: user?.profileImage || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      } finally {
        setFetching(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = getCookie("accessToken");
      const res = await fetch(`${BASE_URL}/api/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? (token.startsWith("Bearer ") ? token : `Bearer ${token}`) : "",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        toast.error("Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully!");
      // Role অনুযায়ী সঠিক Profile পেজে ফেরত পাঠানো
      router.push(`/dashboard/${userRole}/profile`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="rounded-3xl border bg-white p-6 sm:p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="p-2 border rounded-xl hover:bg-slate-50 transition">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold">Edit Profile</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase text-slate-500">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full mt-1 p-3 border rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-500">Address</label>
            <textarea
              rows={3}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full mt-1 p-3 border rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-500">Profile Image URL</label>
            <input
              type="text"
              value={formData.profileImage}
              onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
              className="w-full mt-1 p-3 border rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700">
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Save className="mr-2 h-4 w-4" />} Save
          </Button>
        </form>
      </div>
    </div>
  );
}