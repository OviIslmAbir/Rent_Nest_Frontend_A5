import {
  Home,
  Clock3,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default async function TenantPage() {


  const dashboard = {
    activeRental: 1,
    pendingRequests: 2,
    monthlyRent: 12000,
    paymentStatus: "Paid",
  };

  const recentActivities = [
    {
      id: 1,
      title: "Rental Request Submitted",
      property: "Green Valley Apartment",
      status: "Pending",
    },
    {
      id: 2,
      title: "Rent Payment Completed",
      property: "July 2026",
      status: "Paid",
    },
  ];

  return (
    <div className="space-y-8">

      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white">
        <h1 className="text-3xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-blue-100">
          Manage your rentals, requests and payments from one place.
        </p>
      </div>


      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <Home className="mb-3 text-blue-600" size={34} />

          <h2 className="text-3xl font-bold">
            {dashboard.activeRental}
          </h2>

          <p className="text-slate-500">
            Active Rental
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <Clock3 className="mb-3 text-amber-500" size={34} />

          <h2 className="text-3xl font-bold">
            {dashboard.pendingRequests}
          </h2>

          <p className="text-slate-500">
            Pending Requests
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <CreditCard className="mb-3 text-emerald-600" size={34} />

          <h2 className="text-3xl font-bold">
            ৳ {dashboard.monthlyRent}
          </h2>

          <p className="text-slate-500">
            Monthly Rent
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <CheckCircle2 className="mb-3 text-green-600" size={34} />

          <h2 className="text-xl font-bold">
            {dashboard.paymentStatus}
          </h2>

          <p className="text-slate-500">
            Payment Status
          </p>
        </div>
      </div>


      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/properties"
          className="rounded-2xl border bg-white p-6 shadow-sm hover:border-blue-500 hover:shadow-md transition"
        >
          <h3 className="font-bold text-lg">
            Browse Properties
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Find your next rental home.
          </p>
        </Link>

        <Link
          href="/dashboard/tenant/rental-requests"
          className="rounded-2xl border bg-white p-6 shadow-sm hover:border-blue-500 hover:shadow-md transition"
        >
          <h3 className="font-bold text-lg">
            Rental Requests
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            View all your requests.
          </p>
        </Link>

        <Link
          href="/dashboard/tenant/payments"
          className="rounded-2xl border bg-white p-6 shadow-sm hover:border-blue-500 hover:shadow-md transition"
        >
          <h3 className="font-bold text-lg">
            Payment History
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Check your rent payments.
          </p>
        </Link>

        <Link
          href="/dashboard/profile"
          className="rounded-2xl border bg-white p-6 shadow-sm hover:border-blue-500 hover:shadow-md transition"
        >
          <h3 className="font-bold text-lg">
            My Profile
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Update your personal information.
          </p>
        </Link>
      </div>


      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">
          Recent Activity
        </h2>

        <div className="mt-6 space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
            >
              <div>
                <h4 className="font-semibold">
                  {activity.title}
                </h4>

                <p className="text-sm text-slate-500">
                  {activity.property}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  activity.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}