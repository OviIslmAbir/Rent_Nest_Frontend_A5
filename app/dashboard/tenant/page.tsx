import {
  Home,
  Clock3,
  CreditCard,
  CheckCircle2,
  Building2,
  User,
  Receipt,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

import { getMyRentalRequests } from "@/services/rental";
import { RentalRequest } from "@/types";

export default async function TenantPage() {
  let requests: RentalRequest[] = [];
  let errorMsg: string | null = null;

  try {
    const response = await getMyRentalRequests();

    if (response?.data && Array.isArray(response.data)) {
      requests = response.data;
    } else if (Array.isArray(response)) {
      requests = response;
    } else {
      requests = [];
    }
  } catch (error: unknown) {
    console.error("Dashboard fetch error:", error);
    errorMsg = "Failed to load dashboard data from server.";
  }

  const isPaidOrActive = (r: RentalRequest) =>
    r.status === "ACTIVE" || r.payment?.status === "COMPLETED";

  const activeRentals = requests.filter(isPaidOrActive);
  const pendingRequests = requests.filter((r) => r.status === "PENDING");
  const approvedUnpaid = requests.filter(
    (r) => r.status === "APPROVED" && !isPaidOrActive(r)
  );

  const totalMonthlyRent = activeRentals.reduce(
    (sum, item) => sum + (item.property?.rentPrice || 0),
    0
  );

  const recentActivities = requests.slice(0, 5);

  return (
    <div className="space-y-8 p-6 md:p-10 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
        <p className="mt-2 text-blue-100">
          Manage your rentals, requests, and payments from one place.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2 text-sm font-medium">
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-800">
              {activeRentals.length}
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-1">
              Active Rental{activeRentals.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Home size={30} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-800">
              {pendingRequests.length}
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-1">
              Pending Requests
            </p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
            <Clock3 size={30} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-800">
              $ {totalMonthlyRent.toLocaleString()}
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-1">
              Monthly Rent
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CreditCard size={30} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-emerald-600">
              {activeRentals.length > 0
                ? "Active Tenant"
                : approvedUnpaid.length > 0
                ? "Payment Due"
                : "No Tenancy"}
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-1">
              Payment Status
            </p>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <CheckCircle2 size={30} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/properties"
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:border-blue-500 hover:shadow-md transition group"
        >
          <Building2
            className="text-blue-600 mb-2 group-hover:scale-110 transition-transform"
            size={24}
          />
          <h3 className="font-bold text-lg text-slate-800">
            Browse Properties
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Find your next rental home.
          </p>
        </Link>

        <Link
          href="/dashboard/tenant/requests"
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:border-blue-500 hover:shadow-md transition group"
        >
          <Home
            className="text-blue-600 mb-2 group-hover:scale-110 transition-transform"
            size={24}
          />
          <h3 className="font-bold text-lg text-slate-800">
            Rental Requests
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Total Requests ({requests.length})
          </p>
        </Link>

        <Link
          href="/dashboard/tenant/payments"
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:border-blue-500 hover:shadow-md transition group"
        >
          <Receipt
            className="text-blue-600 mb-2 group-hover:scale-110 transition-transform"
            size={24}
          />
          <h3 className="font-bold text-lg text-slate-800">
            Payment History
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Check your rent payments.
          </p>
        </Link>

        <Link
          href="/dashboard/tenant/profile"
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:border-blue-500 hover:shadow-md transition group"
        >
          <User
            className="text-blue-600 mb-2 group-hover:scale-110 transition-transform"
            size={24}
          />
          <h3 className="font-bold text-lg text-slate-800">My Profile</h3>
          <p className="mt-1 text-sm text-slate-500">
            Update your personal info.
          </p>
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>

        <div className="mt-4 space-y-3">
          {recentActivities.length === 0 ? (
            <p className="text-slate-400 text-sm py-4 text-center">
              No recent rental activities found.
            </p>
          ) : (
            recentActivities.map((req: RentalRequest) => {
              const active = isPaidOrActive(req);
              const statusText = active ? "ACTIVE / PAID" : req.status;

              return (
                <div
                  key={req.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-4 border border-slate-100"
                >
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {req.property?.title || "Rental Application"}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Move-in Date:{" "}
                      {req.moveInDate
                        ? new Date(req.moveInDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      active || req.status === "APPROVED"
                        ? "bg-emerald-100 text-emerald-700"
                        : req.status === "PENDING"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {statusText}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}