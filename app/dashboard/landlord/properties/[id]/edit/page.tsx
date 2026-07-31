"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { landlordService, Category } from "@/services/landlord";

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params?.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    area: "",
    rentPrice: 0,
    bedrooms: 1,
    bathrooms: 1,
    amenities: "",
    images: "",
    categoryId: "",
  });

  // ক্যাটাগরি এবং বিদ্যমান প্রোপার্টির ডাটা লোড করা
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const catRes = await landlordService.getCategories();
        setCategories(catRes);

        // প্রোপার্টি লিস্ট থেকে বিদ্যমান ডাটা খুঁজে বের করা
        const propRes = await landlordService.getMyProperties();
        const propertyList = Array.isArray(propRes) ? propRes : propRes?.data || [];
        const currentProp = propertyList.find((p: any) => p.id === propertyId || p._id === propertyId);

        if (currentProp) {
          setFormData({
            title: currentProp.title || "",
            description: currentProp.description || "",
            address: currentProp.address || "",
            city: currentProp.city || "",
            area: currentProp.area || "",
            rentPrice: currentProp.rentPrice || currentProp.price || 0,
            bedrooms: currentProp.bedrooms || 1,
            bathrooms: currentProp.bathrooms || 1,
            amenities: Array.isArray(currentProp.amenities) ? currentProp.amenities.join(", ") : "",
            images: Array.isArray(currentProp.images) ? currentProp.images.join(", ") : "",
            categoryId: currentProp.categoryId || currentProp.category?.id || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch property details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      loadInitialData();
    }
  }, [propertyId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rentPrice" || name === "bedrooms" || name === "bathrooms" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      amenities: formData.amenities.split(",").map((item) => item.trim()).filter(Boolean),
      images: formData.images.split(",").map((item) => item.trim()).filter(Boolean),
    };

    try {
      const res = await landlordService.updateProperty(propertyId, payload);
      if (res?.success !== false) {
        alert("Property updated successfully!");
        router.push("/dashboard/landlord");
      } else {
        alert(res?.message || "Failed to update property.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating the property.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
        <p className="text-slate-500 font-medium text-sm">Loading property data...</p>
      </div>
    );
  }

  return (
    <main className="p-6 md:p-10 max-w-4xl mx-auto space-y-6">
      {/* Header & Back Link */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/landlord">
          <Button variant="outline" size="icon" className="rounded-xl border-slate-200">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-800">Edit Property</h1>
          <p className="text-sm text-slate-500 font-medium">Update the details of your property listing.</p>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 font-medium resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Area</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Rent Price ($)</label>
              <input
                type="number"
                name="rentPrice"
                value={formData.rentPrice}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          {categories.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 font-medium bg-white"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Image URLs (Comma separated)
            </label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              placeholder="https://img1.jpg, https://img2.jpg"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Amenities (Comma separated)
            </label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="WiFi, Parking, Balcony"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-end gap-3">
          <Link href="/dashboard/landlord">
            <Button type="button" variant="outline" className="rounded-xl h-11 px-5 border-slate-200 font-bold">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl h-11 px-6 flex items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            {submitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Save className="h-5 w-5" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </main>
  );
}