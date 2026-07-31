"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Building2, MapPin, Loader2, Home, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { landlordService } from "@/services/landlord";

interface Property {
  id: string;
  title: string;
  location?: string;
  address?: string;
  rentPrice?: number;
  price?: number;
  images?: string[];
}

export default function LandlordDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadProperties = async () => {
      try {
        const fetchFn =
          landlordService.getMyProperties ||
          (landlordService as any).getProperties;
        const res = await fetchFn();

        if (!active) return;

        if (Array.isArray(res)) {
          setProperties(res);
        } else if (res && res.data && Array.isArray(res.data)) {
          setProperties(res.data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        if (active) setProperties([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProperties();

    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this property?");
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await landlordService.deleteProperty(id);

      setProperties((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete property:", error);
      alert("Could not delete property. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            Landlord Dashboard
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Manage your listed properties and keep track of your rentals.
          </p>
        </div>
        <Link href="/dashboard/landlord/properties/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl h-11 px-5 flex items-center gap-2 shadow-lg shadow-blue-500/20">
            <Plus className="h-5 w-5" /> Add New Property
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-800">Your Properties</h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-100">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
            <p className="text-sm text-slate-500">Loading your properties...</p>
          </div>
        ) : !Array.isArray(properties) || properties.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-3xl border border-slate-100 space-y-3">
            <Home className="h-12 w-12 text-slate-300 mx-auto" />
            <p className="text-slate-600 font-semibold">
              No properties added yet.
            </p>
            <Link href="/dashboard/landlord/properties/new" className="inline-block">
              <Button
                variant="outline"
                className="rounded-xl border-blue-200 text-blue-600"
              >
                Add your first property
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-100">
                    <Image
                      src={item.images?.[0] || "/placeholder.jpg"}
                      alt={item.title || "Property"}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                      ${item.rentPrice || item.price || 0}/mo
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-slate-800 line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span className="line-clamp-1">
                        {item.address || item.location || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-slate-50 flex items-center justify-between gap-2">
                  <Link
                    href={`/dashboard/landlord/properties/${item.id}/edit`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 text-xs font-semibold h-9"
                    >
                      <Pencil className="h-3.5 w-3.5 text-slate-500" />
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="flex-1 rounded-xl border-red-100 bg-red-50/50 text-red-600 hover:bg-red-100 hover:text-red-700 flex items-center gap-1.5 text-xs font-semibold h-9"
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-red-600" />
                    ) : (
                      <>
                        <Trash2 className="h-3.5 w-3.5 text-red-500" />
                        Delete
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}