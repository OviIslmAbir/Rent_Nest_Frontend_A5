"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { landlordService, Category } from "@/services/landlord";

export default function CreatePropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [fetchingCategories, setFetchingCategories] = useState(true);

  const [amenityInput, setAmenityInput] = useState("");
  const [amenities, setAmenities] = useState<string[]>(["WiFi", "Security"]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    area: "",
    rentPrice: "",
    bedrooms: "",
    bathrooms: "",
    images: "",
    categoryId: "",
  });

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        const data = await landlordService.getCategories();
        if (isMounted && Array.isArray(data)) {
          setCategories(data);
          if (data.length > 0) {
            setFormData((prev) => ({ ...prev, categoryId: data[0].id }));
          }
        }
      } catch (err) {
        console.error("Error loading categories:", err);
        if (isMounted) {
          toast.error("Could not load property categories", {
            position: "top-center",
          });
        }
      } finally {
        if (isMounted) {
          setFetchingCategories(false);
        }
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddAmenity = () => {
    if (amenityInput.trim() && !amenities.includes(amenityInput.trim())) {
      setAmenities([...amenities, amenityInput.trim()]);
      setAmenityInput("");
    }
  };

  const handleRemoveAmenity = (indexToRemove: number) => {
    setAmenities(amenities.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryId) {
      toast.error("Please select a category", { position: "top-center" });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        area: formData.area,
        rentPrice: Number(formData.rentPrice),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        amenities: amenities,
        images: formData.images
          ? formData.images.split(",").map((url) => url.trim())
          : [],
        categoryId: formData.categoryId,
      };

      const res = await landlordService.createProperty(payload);

      if (res?.success !== false) {
        toast.success("Property created successfully!", {
          position: "top-center",
        });
        router.push("/dashboard/landlord");
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to create property.", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Failed to create property. Please try again.", {
        position: "top-center",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main suppressHydrationWarning className="p-6 md:p-10 max-w-4xl mx-auto">
      <div
        suppressHydrationWarning
        className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-800">
              Add New Property
            </h1>
            <p className="text-xs text-slate-500">
              Provide complete property details matching server API format
            </p>
          </div>
        </div>

        <form
          suppressHydrationWarning
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Property Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Independent House"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full mt-1.5 p-3.5 border border-slate-200 rounded-2xl bg-slate-50/50 text-sm focus:outline-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Category *
              </label>
              {fetchingCategories ? (
                <div className="mt-1.5 p-3.5 border border-slate-200 rounded-2xl bg-slate-50 text-xs text-slate-400 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading
                  categories...
                </div>
              ) : (
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="w-full mt-1.5 p-3.5 border border-slate-200 rounded-2xl bg-slate-50/50 text-sm focus:outline-blue-600 font-medium text-slate-700"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                City *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rajshahi"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full mt-1.5 p-3.5 border border-slate-200 rounded-2xl bg-slate-50/50 text-sm focus:outline-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Area *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Uposhohor"
                value={formData.area}
                onChange={(e) =>
                  setFormData({ ...formData, area: e.target.value })
                }
                className="w-full mt-1.5 p-3.5 border border-slate-200 rounded-2xl bg-slate-50/50 text-sm focus:outline-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Address *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sector 7"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full mt-1.5 p-3.5 border border-slate-200 rounded-2xl bg-slate-50/50 text-sm focus:outline-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Rent Price (BDT / $) *
              </label>
              <input
                type="number"
                required
                placeholder="35000"
                value={formData.rentPrice}
                onChange={(e) =>
                  setFormData({ ...formData, rentPrice: e.target.value })
                }
                className="w-full mt-1.5 p-3.5 border border-slate-200 rounded-2xl bg-slate-50/50 text-sm focus:outline-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Bedrooms *
              </label>
              <input
                type="number"
                required
                placeholder="4"
                value={formData.bedrooms}
                onChange={(e) =>
                  setFormData({ ...formData, bedrooms: e.target.value })
                }
                className="w-full mt-1.5 p-3.5 border border-slate-200 rounded-2xl bg-slate-50/50 text-sm focus:outline-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Bathrooms *
              </label>
              <input
                type="number"
                required
                placeholder="3"
                value={formData.bathrooms}
                onChange={(e) =>
                  setFormData({ ...formData, bathrooms: e.target.value })
                }
                className="w-full mt-1.5 p-3.5 border border-slate-200 rounded-2xl bg-slate-50/50 text-sm focus:outline-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">
              Amenities
            </label>
            <div className="flex gap-2 mt-1.5">
              <input
                type="text"
                placeholder="Add amenity (e.g. Garage, Garden, WiFi)"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddAmenity();
                  }
                }}
                className="flex-1 p-3.5 border border-slate-200 rounded-2xl bg-slate-50/50 text-sm focus:outline-blue-600"
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl flex items-center gap-1 transition-colors text-xs"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>

            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {amenities.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveAmenity(index)}
                      className="hover:text-red-500"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">
              Image URLs (Comma Separated) *
            </label>
            <input
              type="text"
              required
              placeholder="https://example.com/house1.jpg, https://example.com/house2.jpg"
              value={formData.images}
              onChange={(e) =>
                setFormData({ ...formData, images: e.target.value })
              }
              className="w-full mt-1.5 p-3.5 border border-slate-200 rounded-2xl bg-slate-50/50 text-sm focus:outline-blue-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">
              Description *
            </label>
            <textarea
              required
              rows={4}
              placeholder="A beautiful independent house with a private garden."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full mt-1.5 p-3.5 border border-slate-200 rounded-2xl bg-slate-50/50 text-sm focus:outline-blue-600"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl mt-4 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Save className="h-5 w-5" /> Submit Property
              </>
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}