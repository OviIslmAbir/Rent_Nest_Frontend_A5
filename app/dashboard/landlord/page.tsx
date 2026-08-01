"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Clock, 
  DollarSign, 
  Plus, 
  ArrowRight, 
  Loader2, 
  FileText,
  TrendingUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { landlordService } from "@/services/landlord";

export default function LandlordDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeRequests: 0,
    totalEarnings: 0,
  });
  const [recentProperties, setRecentProperties] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);

        // Fetch landlord properties
        const fetchPropertiesFn =
          landlordService.getMyProperties ||
          (landlordService as any).getProperties;
        
        const propsRes = await fetchPropertiesFn();
        const propertyList = Array.isArray(propsRes)
          ? propsRes
          : propsRes?.data || [];

        // Compute total monthly revenue/earnings from properties
        const estimatedEarnings = propertyList.reduce((acc: number, curr: any) => {
          return acc + (curr.rentPrice || curr.price || 0);
        }, 0);

        // Fetch requests if landlordService supports it or fallback
        let requestsCount = 0;
        if (typeof (landlordService as any).getLandlordRequests === "function") {
          const reqRes = await (landlordService as any).getLandlordRequests();
          const reqList = Array.isArray(reqRes) ? reqRes : reqRes?.data || [];
          requestsCount = reqList.length;
        }

        setStats({
          totalProperties: propertyList.length,
          activeRequests: requestsCount,
          totalEarnings: estimatedEarnings,
        });

        setRecentProperties(propertyList.slice(0, 3)); // show top 3
      } catch (error) {
        console.error("Dashboard overview fetch error:", error);
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
        <p className="text-slate-500 font-medium text-sm">Loading overview...</p>
      </div>
    );
  }

  return (
    <main className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
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
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl h-11 px-5 flex items-center gap-2 shadow-lg shadow-blue-500/20">
              <Plus className="h-5 w-5" /> Add Property
            </Button>
          </Link>
        </div>
      </div>

      {/* OVERVIEW STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Properties */}
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

        {/* Card 2: Active Requests */}
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

        {/* Card 3: Monthly Earnings */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Est. Monthly Earnings
            </p>
            <h2 className="text-3xl font-black text-slate-800">
              ৳{stats.totalEarnings.toLocaleString()}
            </h2>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 pt-1">
              <TrendingUp className="w-3.5 h-3.5" /> Rental revenue
            </p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600">
            <DollarSign className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS & RECENT LISTINGS PREVIEW */}
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
          <div className="text-center py-8 text-slate-400 text-sm">
            No properties found in your account yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentProperties.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-100">
                    <img 
                      src={item.images?.[0] || "/placeholder.jpg"} 
                      alt={item.title} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 line-clamp-1">{item.title}</p>
                    <p className="text-xs text-slate-400 line-clamp-1">{item.address || item.location || "N/A"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-blue-600">
                    ৳{(item.rentPrice || item.price || 0).toLocaleString()}/mo
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}