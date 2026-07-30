"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Phone, MapPin, ImageIcon, Save, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function EditProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

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

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`;
      }

      const res = await fetch("https://rentnest-nine.vercel.app/api/auth/me", {
        headers,
      });

      if (!res.ok) {
        throw new Error(`Server returned status: ${res.status}`);
      }

      const result = await res.json();
      const user = result?.data || result;

      setFormData({
        phone: user?.phone || "",
        address: user?.address || "",
        profileImage: user?.profileImage || "",
      });
    } catch (error) {
      console.warn("Could not fetch profile data automatically:", error);
    } finally {
      setFetching(false);
    }
  };

  fetchUserData();
}, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = getCookie("accessToken");

      const res = await fetch(
        "https://rentnest-nine.vercel.app/api/auth/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
              ? token.startsWith("Bearer ")
                ? token
                : `Bearer ${token}`
              : "",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.message || "Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully!");
      router.push("/dashboard/profile");
      router.refresh();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-sm font-medium text-slate-500">Loading details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-100 p-6 sm:p-8">
        
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Edit Profile</h1>
            <p className="text-xs text-slate-500">Update your personal contact details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="mb-2 block text-xs font-bold text-slate-600 uppercase tracking-wider">
              Phone Number
            </label>
            <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50/50 px-4 h-12 focus-within:border-blue-500 focus-within:bg-white transition-all">
              <Phone className="mr-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="017xxxxxxxx"
                className="w-full bg-transparent text-sm text-slate-800 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-slate-600 uppercase tracking-wider">
              Address
            </label>
            <div className="flex rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 focus-within:border-blue-500 focus-within:bg-white transition-all">
              <MapPin className="mr-3 mt-0.5 h-5 w-5 text-slate-400 shrink-0" />
              <textarea
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full resize-none bg-transparent text-sm text-slate-800 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-slate-600 uppercase tracking-wider">
              Profile Image URL
            </label>
            <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50/50 px-4 h-12 focus-within:border-blue-500 focus-within:bg-white transition-all">
              <ImageIcon className="mr-3 h-5 w-5 text-slate-400 shrink-0" />
              <input
                type="text"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-transparent text-sm text-slate-800 outline-none"
              />
            </div>
          </div>
          {formData.profileImage && (
            <div className="flex flex-col items-center justify-center pt-2">
              <p className="text-xs text-slate-400 mb-2">Image Preview:</p>
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-blue-500 shadow-md">
                <Image
                  src={formData.profileImage}
                  alt="Preview"
                  fill
                  className="object-cover"
                  onError={() => toast.error("Invalid Image URL")}
                />
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12 rounded-xl text-slate-600 border-slate-200 hover:bg-slate-50"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/20"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </span>
              )}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}