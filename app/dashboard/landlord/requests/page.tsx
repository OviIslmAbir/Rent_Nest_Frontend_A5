"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Clock, Loader2, Home, User, Mail, Calendar } from "lucide-react";
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


  const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL");

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
        prev.map((req) => ((req.id || (req as any)._id) === id ? { ...req, status } : req))
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Something went wrong while updating status.");
    } finally {
      setActionLoadingId(null);
    }
  };


  const counts = {
    ALL: requests.length,
    PENDING: requests.filter((r) => (r.status || "PENDING").toUpperCase() === "PENDING").length,
    APPROVED: requests.filter((r) =>
      ["APPROVED", "PAID", "COMPLETED", "BOOKED"].includes((r.status || "").toUpperCase())
    ).length,
    REJECTED: requests.filter((r) => (r.status || "").toUpperCase() === "REJECTED").length,
  };


  const filteredRequests = requests.filter((req) => {
    if (statusFilter === "ALL") return true;

    const reqStatus = (req.status || "PENDING").toUpperCase();

    if (statusFilter === "APPROVED") {
      return ["APPROVED", "PAID", "COMPLETED", "BOOKED"].includes(reqStatus);
    }

    return reqStatus === statusFilter;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
        <p className="text-slate-500 font-medium text-sm">Loading rental requests...</p>
      </div>
    );
  }

  return (
    <main className="p-6 md:p-10 max-w-5xl mx-auto space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Manage Rental Requests</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Approve or reject rental requests from potential tenants.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl w-fit flex-wrap">
          {[
            { label: "All", value: "ALL", count: counts.ALL },
            { label: "Pending", value: "PENDING", count: counts.PENDING },
            { label: "Approved", value: "APPROVED", count: counts.APPROVED },
            { label: "Rejected", value: "REJECTED", count: counts.REJECTED },
          ].map((tab) => {
            const isActive = statusFilter === tab.value;

            return (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value as any)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>


      {filteredRequests.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 font-medium">
            {requests.length === 0
              ? "No rental requests found."
              : `No ${statusFilter.toLowerCase()} requests.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredRequests.map((req) => {
            const reqId = req.id || (req as any)._id;
            const price = req.property?.rentPrice || (req.property as any)?.price || 0;
            const tenantName = req.tenant?.name || req.tenant?.email || `Tenant ID: ${req.tenantId}`;
            const tenantEmail = req.tenant?.email;
            const propertyTitle = req.property?.title || `Property ID: ${req.propertyId}`;
            const date = (req as any).createdAt
              ? new Date((req as any).createdAt).toLocaleDateString()
              : null;


            const currentStatus = (req.status || "PENDING").toUpperCase();
            const isApprovedOrPaid = ["APPROVED", "PAID", "COMPLETED", "BOOKED"].includes(currentStatus);
            const isRejected = currentStatus === "REJECTED";
            const isPending = currentStatus === "PENDING";

            return (
              <div
                key={reqId}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-slate-200"
              >
                <div className="space-y-2.5 flex-1">

                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-blue-600 shrink-0" />
                    <span className="font-bold text-slate-800 text-base">
                      {propertyTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1 text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <User className="h-3.5 w-3.5 text-blue-600" />
                      {tenantName}
                    </span>

                    {tenantEmail && req.tenant?.name && (
                      <span className="flex items-center gap-1 text-slate-400">
                        <Mail className="h-3.5 w-3.5" />
                        {tenantEmail}
                      </span>
                    )}

                    <span className="text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-lg">
                      ৳{price.toLocaleString()}/mo
                    </span>

                    {date && (
                      <span className="flex items-center gap-1 text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {date}
                      </span>
                    )}
                  </div>


                  {req.message && (
                    <p className="text-xs bg-slate-50 p-3 rounded-xl text-slate-600 border border-slate-100 italic">
                      &quot;{req.message}&quot;
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {isApprovedOrPaid && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <CheckCircle2 className="h-4 w-4" /> 
                      {currentStatus === "PAID" ? "Paid & Approved" : "Approved"}
                    </span>
                  )}

                  {isRejected && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100">
                      <XCircle className="h-4 w-4" /> Rejected
                    </span>
                  )}

                  {isPending && (
                    <>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100 mr-1">
                        <Clock className="h-4 w-4" /> Pending
                      </span>

                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(reqId, "APPROVED")}
                        disabled={actionLoadingId === reqId}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl h-9 px-4"
                      >
                        {actionLoadingId === reqId ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Approve"
                        )}
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(reqId, "REJECTED")}
                        disabled={actionLoadingId === reqId}
                        className="border-rose-200 text-rose-600 hover:bg-rose-50 font-bold rounded-xl h-9 px-4"
                      >
                        Reject
                      </Button>
                    </>
                  )}


                  {!isApprovedOrPaid && !isRejected && !isPending && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
                      {req.status}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}