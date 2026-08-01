"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Clock, 
  Plus, 
  ArrowRight, 
  Loader2, 
  FileText,
  TrendingUp,
  Banknote,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { landlordService } from "@/services/landlord";

interface Property {
  id?: string;
  _id?: string;
  title: string;
  address?: string;
  location?: string;
  rentPrice?: number;
  price?: number;
  isBooked?: boolean;
  status?: string;
  images?: string[];
}

export default function LandlordDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeRequests: 0,
    totalEarnings: 0,
  });
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);

        const fetchPropertiesFn =
          landlordService.getMyProperties ||
          (landlordService as any).getProperties;
        
        const propsRes = await fetchPropertiesFn();
        

        let propertyList: Property[] = [];
        if (Array.isArray(propsRes)) {
          propertyList = propsRes;
        } else if (Array.isArray(propsRes?.data)) {
          propertyList = propsRes.data;
        } else if (Array.isArray(propsRes?.data?.data)) {
          propertyList = propsRes.data.data;
        }

        const rentedEarnings = propertyList.reduce((acc: number, curr: Property) => {
          const isRented = 
            curr.status === "RENTED" || 
            curr.status === "UNAVAILABLE" || 
            curr.isBooked === true;

          const price = Number(curr.rentPrice || curr.price || 0);

  
          return isRented ? acc + price : acc;
        }, 0);


        let requestsCount = 0;
        const fetchRequestsFn =
          (landlordService as any).getLandlordRequests ||
          (landlordService as any).getRequests ||
          (landlordService as any).getMyRequests;

        if (typeof fetchRequestsFn === "function") {
          const reqRes = await fetchRequestsFn();
          let reqList: any[] = [];
          
          if (Array.isArray(reqRes)) {
            reqList = reqRes;
          } else if (Array.isArray(reqRes?.data)) {
            reqList = reqRes.data;
          } else if (Array.isArray(reqRes?.data?.data)) {
            reqList = reqRes.data.data;
          }

          const pendingRequests = reqList.filter(
            (r: any) => !r.status || r.status === "PENDING" || r.status === "APPROVED"
          );
          requestsCount = pendingRequests.length;
        }
        setStats({
          totalProperties: propertyList.length,
          activeRequests: requestsCount,
          totalEarnings: rentedEarnings, 
        });


        setRecentProperties(propertyList.slice(0, 3));
      } catch (err: any) {
        console.error("Dashboard overview fetch error:", err);
        setError("Failed to load dashboard data. Please refresh.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
        <p className="text-slate-500 font-medium text-sm">Loading dashboard overview...</p>
      </div>
    );
  }

  return (
    <main className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            Landlord Overview
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Welcome back! Here is a summary of your property business performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/landlord/properties/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl h-11 px-5 flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all">
              <Plus className="h-5 w-5" /> Add Property
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2 text-sm font-medium">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Properties
            </p>
            <h2 className="text-3xl font-black text-slate-800">
              {stats.totalProperties}
            </h2>
            <p className="text-xs text-blue-600 font-semibold flex items-center gap-1 pt-1">
              <TrendingUp className="w-3.5 h-3.5" /> Active Listings
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
            <Building2 className="w-8 h-8" />
          </div>
        </div>


        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Requests
            </p>
            <h2 className="text-3xl font-black text-slate-800">
              {stats.activeRequests}
            </h2>
            <p className="text-xs text-amber-600 font-semibold flex items-center gap-1 pt-1">
              <Clock className="w-3.5 h-3.5" /> Pending tenant actions
            </p>
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl text-amber-600">
            <FileText className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Monthly Revenue
            </p>
            <h2 className="text-3xl font-black text-slate-800">
              ${stats.totalEarnings.toLocaleString("en-BD")}
            </h2>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 pt-1">
              <TrendingUp className="w-3.5 h-3.5" /> From rented properties
            </p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600">
            <Banknote className="w-8 h-8" />
          </div>
        </div>
      </div>


      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Recent Properties Overview
            </h2>
            <p className="text-xs text-slate-400">
              Quick view of your top listed places.
            </p>
          </div>
          <Link href="/dashboard/landlord/properties">
            <Button variant="ghost" className="text-blue-600 font-bold text-xs flex items-center gap-1 hover:bg-blue-50 rounded-xl">
              View All Properties <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {recentProperties.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm flex flex-col items-center justify-center gap-3">
            <Building2 className="w-10 h-10 text-slate-300" />
            <p>No properties found in your account yet.</p>
            <Link href="/dashboard/landlord/properties/new">
              <Button size="sm" className="bg-blue-600 text-white rounded-xl mt-1">
                Add Your First Property
              </Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentProperties.map((item) => {
              const propertyId = item.id || item._id;
              const price = item.rentPrice || item.price || 0;
              const imageSrc = item.images && item.images.length > 0 ? item.images[0] : "/placeholder.jpg";

              const isRented = 
                item.status === "RENTED" || 
                item.status === "UNAVAILABLE" || 
                item.isBooked === true;

              return (
                <div key={propertyId} className="py-3.5 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-2xl transition">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-100 shrink-0">
                      <img 
                        src={imageSrc} 
                        alt={item.title || "Property"} 
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          (e.target as HTMLElement).setAttribute("src", "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=200&auto=format&fit=crop");
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 line-clamp-1">{item.title}</p>
                      <p className="text-xs text-slate-400 line-clamp-1">{item.address || item.location || "Location N/A"}</p>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="text-sm font-black text-blue-600">
                        ${price.toLocaleString("en-BD")}/mo
                      </p>
                      {isRented ? (
                        <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full inline-block">
                          Rented
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                          Available
                        </span>
                      )}
                    </div>
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