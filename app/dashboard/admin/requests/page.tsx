"use client";

import { useEffect, useState } from "react";
import { FileText, Loader2, CheckCircle2, XCircle, Clock } from "lucide-react";
import { getAllRentals, RentalRequestItem } from "@/services/admin";

export default function AdminRentalModerationPage() {
  const [rentals, setRentals] = useState<RentalRequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    setLoading(true);
    try {
      const rentalsData = await getAllRentals();
      setRentals(rentalsData);
    } catch (error) {
      console.error("Failed to load rental requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> {status}
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" /> {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> {status || "PENDING"}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
        <p className="text-slate-500 font-medium text-sm">Loading rental requests...</p>
      </div>
    );
  }

  return (
    <main className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-800">Rental Requests Moderation</h1>
        <p className="text-sm text-slate-500 font-medium">
          Inspect and monitor all rental requests across the platform.
        </p>
      </div>

      {/* RENTAL REQUESTS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-800">
            All Rental Requests ({rentals.length})
          </h2>
        </div>

        {rentals.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-medium">
            No rental requests found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs text-slate-400 uppercase font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Tenant Info</th>
                  <th className="px-6 py-4">Property & Landlord</th>
                  <th className="px-6 py-4">Move-in / Duration</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rentals.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Tenant */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{req.tenant?.name || "Tenant"}</div>
                      <div className="text-xs text-slate-400">{req.tenant?.email}</div>
                    </td>

                    {/* Property & Landlord */}
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{req.property?.title || "Property"}</p>
                      <p className="text-xs text-slate-400">
                        Landlord: {req.property?.landlord?.name || req.property?.landlord?.email || "N/A"}
                      </p>
                    </td>

                    {/* Move-in & Duration */}
                    <td className="px-6 py-4 text-xs space-y-1">
                      <div>
                        <strong>Move-in:</strong>{" "}
                        {req.moveInDate ? new Date(req.moveInDate).toLocaleDateString() : "N/A"}
                      </div>
                      <div>
                        <strong>Duration:</strong> {req.duration} Month(s)
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {getStatusBadge(req.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}