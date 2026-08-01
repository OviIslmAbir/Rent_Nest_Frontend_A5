import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  Home,
} from "lucide-react";

import { getMyRentalRequests } from "@/services/rental";

type Rental = {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | string;
  property?: { title?: string; city?: string } | null;
  moveInDate?: string | null;
  duration?: number | null;
  payment?: {
    id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
  } | null;
};

export default async function RentalRequestsPage() {
  const response = await getMyRentalRequests();

  const rawData = response?.data || response;
  const rentals: Rental[] = Array.isArray(rawData) ? rawData : [];

  const pending = rentals.filter((r: Rental) => r.status === "PENDING").length;
  const approved = rentals.filter(
    (r: Rental) => r.status === "APPROVED" && r.payment?.status !== "COMPLETED"
  ).length;
  const rejected = rentals.filter((r: Rental) => r.status === "REJECTED").length;
  const active = rentals.filter(
    (r: Rental) => r.status === "ACTIVE" || r.payment?.status === "COMPLETED"
  ).length;

  return (
    <div className="space-y-8">

      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-md">
        <h1 className="text-3xl font-bold">Rental Requests</h1>
        <p className="mt-2 text-blue-100">
          Track all your rental requests and their current status.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Pending"
          value={pending}
          color="text-yellow-600"
          icon={<Clock3 />}
        />

        <StatCard
          title="Approved (Unpaid)"
          value={approved}
          color="text-emerald-600"
          icon={<CheckCircle2 />}
        />

        <StatCard
          title="Rejected"
          value={rejected}
          color="text-rose-600"
          icon={<XCircle />}
        />

        <StatCard
          title="Active / Paid"
          value={active}
          color="text-blue-600"
          icon={<Home />}
        />
      </div>

  
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Property</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Move In</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Duration</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {rentals.length > 0 ? (
                rentals.map((item: Rental) => {

                  const isPaid =
                    item.payment?.status === "COMPLETED" ||
                    item.status === "ACTIVE";

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-5">
                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {item.property?.title || "N/A"}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {item.property?.city || "N/A"}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {item.moveInDate
                          ? new Date(item.moveInDate).toLocaleDateString()
                          : "--"}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {item.duration ? `${item.duration} Months` : "--"}
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge
                          status={isPaid ? "ACTIVE" : item.status}
                        />
                      </td>

                      <td className="px-6 py-5">

                        {item.status === "APPROVED" && !isPaid ? (
                          <Link
                            href={`/dashboard/tenant/requests/${item.id}`}
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700 transition shadow-sm inline-block"
                          >
                            Pay Now
                          </Link>
                        ) : (
                          <Link
                            href={`/dashboard/tenant/requests/${item.id}`}
                            className="rounded-lg bg-slate-800 px-4 py-2 text-white font-medium hover:bg-slate-900 transition shadow-sm inline-block"
                          >
                            View Request
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-16 text-center text-slate-500"
                  >
                    <CalendarDays
                      size={50}
                      className="mx-auto mb-4 text-slate-300"
                    />

                    <h3 className="text-xl font-semibold text-slate-700">
                      No Rental Requests
                    </h3>

                    <p className="mt-2">
                      You haven&apos;t requested any property yet.
                    </p>

                    <Link
                      href="/properties"
                      className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition shadow-sm"
                    >
                      Browse Properties
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className={`${color} mb-4`}>{icon}</div>

      <h2 className="text-3xl font-bold text-slate-800">{value}</h2>

      <p className="mt-1 text-slate-500 text-sm font-medium">{title}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700 border border-amber-200",
    APPROVED: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    REJECTED: "bg-rose-100 text-rose-700 border border-rose-200",
    ACTIVE: "bg-blue-100 text-blue-700 border border-blue-200",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status === "ACTIVE" ? "ACTIVE / PAID" : status}
    </span>
  );
}