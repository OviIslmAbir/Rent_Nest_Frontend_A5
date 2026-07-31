"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Building2, MapPin, Loader2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { landlordService } from "@/services/landlord";


interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  images?: string[];
}

export default function LandlordDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await landlordService.getProperties();
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <main className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Landlord Dashboard</h1>
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
        ) : properties.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-3xl border border-slate-100 space-y-3">
            <Home className="h-12 w-12 text-slate-300 mx-auto" />
            <p className="text-slate-600 font-semibold">No properties added yet.</p>
            <Link href="/dashboard/landlord/properties/new" className="inline-block">
              <Button variant="outline" className="rounded-xl border-blue-200 text-blue-600">
                Add your first property
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-48 w-full bg-slate-100">
                  <Image
                    src={item.images?.[0] || "/placeholder.jpg"}
                    alt={item.title || "Property"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                    ${item.price}/mo
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-slate-800 line-clamp-1">{item.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}