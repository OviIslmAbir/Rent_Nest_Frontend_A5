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
};

export default async function RentalRequestsPage() {
  const response = await getMyRentalRequests();

  const rawData = response?.data || response;
  const rentals: Rental[] = Array.isArray(rawData) ? rawData : [];

  const pending = rentals.filter((r: Rental) => r.status === "PENDING").length;
  const approved = rentals.filter((r: Rental) => r.status === "APPROVED").length;
  const rejected = rentals.filter((r: Rental) => r.status === "REJECTED").length;
  const active = rentals.filter((r: Rental) => r.status === "ACTIVE").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
        <h1 className="text-3xl font-bold">Rental Requests</h1>
        <p className="mt-2 text-blue-100">
          Track all your rental requests and their current status.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Pending"
          value={pending}
          color="text-yellow-600"
          icon={<Clock3 />}
        />

        <StatCard
          title="Approved"
          value={approved}
          color="text-green-600"
          icon={<CheckCircle2 />}
        />

        <StatCard
          title="Rejected"
          value={rejected}
          color="text-red-600"
          icon={<XCircle />}
        />

        <StatCard
          title="Active"
          value={active}
          color="text-blue-600"
          icon={<Home />}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left">Property</th>
                <th className="px-6 py-4 text-left">Move In</th>
                <th className="px-6 py-4 text-left">Duration</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {rentals.length > 0 ? (
                rentals.map((item: Rental) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-6 py-5">
                      <div>
                        <h3 className="font-semibold">
                          {item.property?.title || "N/A"}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {item.property?.city || "N/A"}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      {item.moveInDate
                        ? new Date(item.moveInDate).toLocaleDateString()
                        : "--"}
                    </td>

                    <td className="px-6 py-5">
                      {item.duration ? `${item.duration} Months` : "--"}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={item.status} />
                    </td>

                    <td className="px-6 py-5">
                      {item.status === "APPROVED" ? (
                        <Link
                          href={`/dashboard/tenant/payments/${item.id}`}
                          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
                        >
                          Pay Now
                        </Link>
                      ) : (
                        <Link
                          // 💡 সঠিক রাউট লিংক ব্যবহার করা হয়েছে
                          href={`/dashboard/tenant/requests/${item.id}`}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                        >
                          View
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
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

                    <h3 className="text-xl font-semibold">
                      No Rental Requests
                    </h3>

                    <p className="mt-2">
                      You haven&apos;t requested any property yet.
                    </p>

                    <Link
                      href="/properties"
                      className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
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

      <h2 className="text-3xl font-bold">{value}</h2>

      <p className="mt-1 text-slate-500">{title}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    ACTIVE: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}