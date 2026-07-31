"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Clock, Loader2, Home, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getLandlordRequests,
  updateRentalRequestStatus,
  RentalRequest,
} from "@/services/landlord";

export default function LandlordRequestsPage() {
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const res = await getLandlordRequests();
        if (!mounted) return;

        if (Array.isArray(res)) {
          setRequests(res);
        } else if (res && Array.isArray((res as any).data)) {
          setRequests((res as any).data);
        } else {
          setRequests([]);
        }
      } catch (error) {
        console.error("Failed to load requests:", error);
        if (mounted) setRequests([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleStatusUpdate = async (id: string, status: "APPROVED" | "REJECTED") => {
    setActionLoadingId(id);
    try {
      const res = await updateRentalRequestStatus(id, status);

      if (res?.success === false) {
        alert(res?.message || "Failed to update status.");
        return;
      }

      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status } : req))
      );
      alert(`Request has been ${status.toLowerCase()}!`);
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Something went wrong while updating status.");
    } finally {
      setActionLoadingId(null);
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

  const requestList = Array.isArray(requests) ? requests : [];

  return (
    <main className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Manage Rental Requests</h1>
        <p className="text-sm text-slate-500 font-medium">
          Approve or reject rental requests from potential tenants.
        </p>
      </div>

      {requestList.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-100">
          <p className="text-slate-500 font-medium">No rental requests found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {requestList.map((req) => (
            <div
              key={req.id}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-blue-600" />
                  <span className="font-bold text-slate-800">
                    {req.property?.title || `Property ID: ${req.propertyId}`}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {req.tenant?.name || req.tenant?.email || `Tenant ID: ${req.tenantId}`}
                  </span>
                  <span>•</span>
                  <span>Rent: ${req.property?.rentPrice || 0}/mo</span>
                </div>

                {req.message && (
                  <p className="text-xs bg-slate-50 p-2.5 rounded-xl text-slate-600 border border-slate-100">
                    &quot;{req.message}&quot;
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                {req.status === "APPROVED" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <CheckCircle2 className="h-4 w-4" /> Approved
                  </span>
                )}

                {req.status === "REJECTED" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100">
                    <XCircle className="h-4 w-4" /> Rejected
                  </span>
                )}

                {req.status === "PENDING" && (
                  <>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100 mr-2">
                      <Clock className="h-4 w-4" /> Pending
                    </span>

                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(req.id, "APPROVED")}
                      disabled={actionLoadingId === req.id}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl h-9 px-4"
                    >
                      {actionLoadingId === req.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Approve"
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(req.id, "REJECTED")}
                      disabled={actionLoadingId === req.id}
                      className="border-rose-200 text-rose-600 hover:bg-rose-50 font-bold rounded-xl h-9 px-4"
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}