"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, 
  Building2, 
  MapPin, 
  Loader2, 
  Home, 
  Pencil, 
  Trash2, 
  Search, 
  Bed, 
  Bath, 
  Tag,
  CheckCircle2,
  Clock,
  XCircle,
  Filter
} from "lucide-react";
import toast from "react-hot-toast"; 
import { Button } from "@/components/ui/button";
import { landlordService } from "@/services/landlord";
import { Property } from "@/types/property";


export default function LandlordAllProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    let active = true;

    const loadProperties = async () => {
      try {
        const fetchFn =
          landlordService.getMyProperties ||
          (landlordService as Record<string, unknown>).getProperties;
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
        toast.error("Failed to load properties list.");
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


  const executeDelete = async (id: string) => {
    const toastId = toast.loading("Deleting property...");
    try {
      setDeletingId(id);
      await landlordService.deleteProperty(id);

      setProperties((prev) => prev.filter((item) => (item.id || item._id) !== id));
      toast.success("Property deleted successfully!", { id: toastId });
    } catch (error) {
      console.error("Failed to delete property:", error);
      toast.error("Could not delete property. Please try again.", { id: toastId });
    } finally {
      setDeletingId(null);
    }
  };


  const confirmDelete = (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <p className="text-sm font-semibold text-slate-800">
          Are you sure you want to delete this property?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              executeDelete(id);
            }}
            className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
      position: "top-center",
    });
  };

  const filteredProperties = properties.filter((item) => {
    const titleMatch = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const cityMatch = item.city?.toLowerCase().includes(searchTerm.toLowerCase());
    const areaMatch = item.area?.toLowerCase().includes(searchTerm.toLowerCase());
    const addressMatch = item.address?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSearch = titleMatch || cityMatch || areaMatch || addressMatch;

    const itemStatus = item.status || "AVAILABLE";
    const matchesStatus =
      statusFilter === "ALL" || itemStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalCount = properties.length;
  const availableCount = properties.filter(
    (p) => (p.status || "AVAILABLE") === "AVAILABLE"
  ).length;
  const rentedCount = properties.filter(
    (p) => p.status === "RENTED" || p.status === "UNAVAILABLE"
  ).length;

  const renderStatusBadge = (status?: string) => {
    switch (status) {
      case "RENTED":
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            <XCircle className="w-3.5 h-3.5" /> Rented
          </span>
        );
      case "UNAVAILABLE":
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 border border-amber-200 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            <Clock className="w-3.5 h-3.5" /> Unavailable
          </span>
        );
      case "AVAILABLE":
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" /> Available
          </span>
        );
    }
  };

  return (
    <main className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            All Properties
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            View, edit, and manage all your listed properties in one place.
          </p>
        </div>
        <Link href="/dashboard/landlord/properties/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl h-11 px-5 flex items-center gap-2 shadow-lg shadow-blue-500/20">
            <Plus className="h-5 w-5" /> Add New Property
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Listed</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{totalCount}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Available Now</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">{availableCount}</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Booked / Rented</p>
            <p className="text-2xl font-black text-rose-500 mt-1">{rentedCount}</p>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl text-rose-500">
            <XCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search title, city or area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 mr-1 hidden md:block" />
          {[
            { label: "All", value: "ALL" },
            { label: "Available", value: "AVAILABLE" },
            { label: "Rented", value: "RENTED" },
            { label: "Unavailable", value: "UNAVAILABLE" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === tab.value
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-slate-100">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
            <p className="text-sm font-medium text-slate-500">Loading properties...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center p-16 bg-white rounded-3xl border border-slate-100 space-y-3">
            <Home className="h-12 w-12 text-slate-300 mx-auto" />
            <p className="text-slate-600 font-semibold">
              {properties.length === 0
                ? "No properties added yet."
                : "No properties match your filter."}
            </p>
            {properties.length === 0 && (
              <Link href="/dashboard/landlord/properties/new" className="inline-block">
                <Button
                  variant="outline"
                  className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  Add your first property
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((item) => {
              const propId = item.id || item._id || "";
              const price = item.rentPrice || item.price || 0;
              const locationText = 
                item.area && item.city 
                  ? `${item.area}, ${item.city}` 
                  : item.address || item.location || "Location N/A";

              return (
                <div
                  key={propId}
                  className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={item.images?.[0] || "/placeholder.jpg"}
                        alt={item.title || "Property"}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).setAttribute(
                            "src",
                            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=400&auto=format&fit=crop"
                          );
                        }}
                      />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <div>{renderStatusBadge(item.status)}</div>
                        {item.category?.name && (
                          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Tag className="w-3 h-3" /> {item.category.name}
                          </span>
                        )}
                      </div>


                      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl text-xs font-black text-blue-600 shadow-md border border-slate-100">
                        ৳{price.toLocaleString("en-BD")}/mo
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="font-bold text-slate-800 text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                          <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span className="line-clamp-1">{locationText}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-2 border-t border-slate-100 text-slate-600 text-xs font-semibold">
                        {item.bedrooms !== undefined && (
                          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100">
                            <Bed className="w-4 h-4 text-blue-600" />
                            <span>{item.bedrooms} Bed</span>
                          </div>
                        )}
                        {item.bathrooms !== undefined && (
                          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100">
                            <Bath className="w-4 h-4 text-blue-600" />
                            <span>{item.bathrooms} Bath</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 border-t border-slate-50 flex items-center justify-between gap-3">
                    <Link
                      href={`/dashboard/landlord/properties/${propId}/edit`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 text-xs font-semibold h-10 transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5 text-slate-500" />
                        Edit
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      onClick={() => confirmDelete(propId)}
                      disabled={deletingId === propId}
                      className="flex-1 rounded-xl border-red-100 bg-red-50/50 text-red-600 hover:bg-red-100 hover:text-red-700 flex items-center justify-center gap-1.5 text-xs font-semibold h-10 transition-colors"
                    >
                      {deletingId === propId ? (
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
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}